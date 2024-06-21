import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApprovalRequestService } from '../../../../services/features/approval-request.service';
import { Router } from '@angular/router';
import { ApprovalRequest } from '../models/approval-request.model';

@Component({
  selector: 'app-approval-request-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './approval-request-details.component.html',
  styleUrl: './approval-request-details.component.css'
})
export class ApprovalRequestDetailsComponent implements OnInit {
  approvalRequestForm: FormGroup;
  statusOptions = ['New', 'Approved', 'Rejected'];
  approvalRequests: ApprovalRequest[]= [];
  constructor(private router: Router,private service: ApprovalRequestService, private fb: FormBuilder) {
    this.approvalRequestForm = this.fb.group({
      id: { value: service.approvalRequests.at(service.selected)?.id, disabled: true },
      approver: service.approvalRequests.at(service.selected)?.approverId,
      leaveRequest: service.approvalRequests.at(service.selected)?.leaveRequestId,
      status: { value: service.approvalRequests.at(service.selected)?.status, disabled: false },
      comment: service.approvalRequests.at(service.selected)?.comment
    });
  }

  async ngOnInit(): Promise<void> {
    await this.service.getDataAsync();
    let statusCheck : boolean = this.service.approvalRequests[this.service.selected].status != "New";
    this.approvalRequests = this.service.approvalRequests;
    this.approvalRequestForm = this.fb.group({
      id: { value: this.service.approvalRequests.at(this.service.selected)?.id, disabled: true },
      approver: { value: this.service.approvalRequests.at(this.service.selected)?.approverId, disabled: statusCheck },
      leaveRequest: { value: this.service.approvalRequests.at(this.service.selected)?.leaveRequestId, disabled: statusCheck },
      status: { value: this.service.approvalRequests.at(this.service.selected)?.status, disabled: false },
      comment: { value: this.service.approvalRequests.at(this.service.selected)?.comment, disabled: statusCheck }
    });
  }

  save(): void {
    const updatedApprovalRequest = this.approvalRequestForm.getRawValue();
    this.service.updateDataAsync(updatedApprovalRequest);
    this.service.approvalRequests[this.service.selected] = updatedApprovalRequest;
    this.service.selected = -1;
    this.router.navigate(["/approval-requests"]);
  }
}
