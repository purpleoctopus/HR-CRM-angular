import { Injectable } from '@angular/core';
import { ApprovalRequest } from '../core/features/approval-request/models/approval-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApprovalRequestService {
  approvalrequests: ApprovalRequest[] = [];
  selected: number = 0;
  constructor() { 
    this.approvalrequests.push({id: "1", approver:"Denys", comment:"Today", leaverequest: "2"});
    this.approvalrequests.push({id: '3', approver: 'Mark', leaverequest: '4', status: 'OK', comment: 'Chill'});
  }
}
