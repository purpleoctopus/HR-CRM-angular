import { Injectable } from '@angular/core';
import { ApprovalRequest } from '../../core/features/approval-request/models/approval-request.model';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApprovalRequestService {
  approvalrequests: ApprovalRequest[] = [];
  selected: number = 0;
  constructor(private http: HttpClient) { }
  async getDataAsync() {
    this.approvalrequests = await firstValueFrom(this.getEmployees());
    console.log(this.approvalrequests)
  }
  getEmployees(): Observable<ApprovalRequest[]>{
    return this.http.get<ApprovalRequest[]>(`${environment.apiUrl}/ApprovalRequest`); 
  }
}
