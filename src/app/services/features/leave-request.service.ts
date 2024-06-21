import { Injectable } from '@angular/core';
import { LeaveRequest } from '../../core/features/leave-request/models/leave-request.model';
import { AddLeaveRequest } from '../../core/features/leave-request/models/add-leave-request.model';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  leaveRequests: LeaveRequest[] = [];
  selected: number = -1;
  constructor(private http: HttpClient, private authService: AuthService) { }
  async addDataAsync(project:AddLeaveRequest){
    this.leaveRequests.push(await firstValueFrom(this.addLeaveRequest(project)))
  }
  async getDataAsync() : Promise<LeaveRequest[]>{
    if(this.authService.roles.includes("hr") || this.authService.roles.includes("pm")){
      this.leaveRequests = await firstValueFrom(this.getLeaveRequests());
    }else if(this.authService.roles.includes("employee")){
      this.leaveRequests = await firstValueFrom(this.getLeaveRequestsById(this.authService.employeeId));
    }
    return this.leaveRequests;
  }
  async updateDataAsync(leaveRequest:LeaveRequest) : Promise<AddLeaveRequest> {
    let request: AddLeaveRequest = leaveRequest;
    let id: string = leaveRequest.id;
    return await firstValueFrom(this.updateLeaveRequest(id,request));
  }
  private addLeaveRequest(request : AddLeaveRequest):Observable<LeaveRequest>{
    return this.http.post<LeaveRequest>(`${environment.apiUrl}/LeaveRequest`, request);
  }
  private updateLeaveRequest(id: string,request : AddLeaveRequest):Observable<AddLeaveRequest>{
    return this.http.put<AddLeaveRequest>(`${environment.apiUrl}/LeaveRequest/${id}`, request)
  }
  private getLeaveRequests(): Observable<LeaveRequest[]>{
    return this.http.get<LeaveRequest[]>(`${environment.apiUrl}/LeaveRequest`); 
  }
  private getLeaveRequestsById(id: string | null): Observable<LeaveRequest[]>{
    return this.http.get<LeaveRequest[]>(`${environment.apiUrl}/LeaveRequest/${id}`); 
  }
}
