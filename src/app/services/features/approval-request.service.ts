import { Injectable } from '@angular/core';
import { ApprovalRequest } from '../../core/features/approval-request/models/approval-request.model';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AddApprovalRequest } from '../../core/features/approval-request/models/add-approval-request.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApprovalRequestService {
  approvalRequests: ApprovalRequest[] = [];
  selected: number = 0;
  constructor(private http: HttpClient, private authService: AuthService) { }
  async getDataAsync() : Promise<ApprovalRequest[]>{
    if(this.authService.roles.includes("hr manager") || this.authService.roles.includes("pm")){
      this.approvalRequests = await firstValueFrom(this.getLeaveRequests());
    }else if(this.authService.roles.includes("employee")){
      this.approvalRequests = await firstValueFrom(this.getLeaveRequestsById(this.authService.employeeId));
    }
    return this.approvalRequests;
  }
  async updateDataAsync(approvalRequest:ApprovalRequest) : Promise<AddApprovalRequest> {
    let request: AddApprovalRequest = approvalRequest;
    let id: string = approvalRequest.id;
    return await firstValueFrom(this.updateLeaveRequest(id,request));
  }
  private updateLeaveRequest(id: string,request : AddApprovalRequest):Observable<AddApprovalRequest>{
    return this.http.put<AddApprovalRequest>(`${environment.apiUrl}/ApprovalRequest/${id}`, request)
  }
  private getLeaveRequests(): Observable<ApprovalRequest[]>{
    return this.http.get<ApprovalRequest[]>(`${environment.apiUrl}/ApprovalRequest`); 
  }
  private getLeaveRequestsById(id: string | null): Observable<ApprovalRequest[]>{
    return this.http.get<ApprovalRequest[]>(`${environment.apiUrl}/ApprovalRequest/${id}`); 
  }
}