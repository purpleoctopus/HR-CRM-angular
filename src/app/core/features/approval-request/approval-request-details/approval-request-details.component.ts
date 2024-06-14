import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApprovalRequestService } from '../../../../services/approval-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-request-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './approval-request-details.component.html',
  styleUrl: './approval-request-details.component.css'
})
export class ApprovalRequestDetailsComponent implements OnInit {
  approvalRequestForm: FormGroup;
  employees:any[] = [];
  leaveRequests:any[] = [];
  statusOptions = ['New', 'Approved', 'Rejected'];

  constructor(private router: Router,private service: ApprovalRequestService, private fb: FormBuilder) {
    this.approvalRequestForm = this.fb.group({
      id: [{ value: service.approvalrequests.at(service.selected)?.id, disabled: true }],
      approver: [service.approvalrequests.at(service.selected)?.approver],
      leaveRequest: [service.approvalrequests.at(service.selected)?.leaverequest],
      status: [{ value: service.approvalrequests.at(service.selected)?.status, disabled: false }],
      comment: [service.approvalrequests.at(service.selected)?.comment]
    });
  }

  ngOnInit(): void {
    this.loadApprovalRequest();
    this.loadEmployees();
    this.loadLeaveRequests();
  }

  loadApprovalRequest(): void {
    /*this.approvalRequestService.getApprovalRequestById(this.approvalRequestId).subscribe(data => {
      this.approvalRequestForm.patchValue(data);
    });*/
  }

  loadEmployees(): void {
    // Implement the logic to load employees from EmployeeService
  }

  loadLeaveRequests(): void {
    // Implement the logic to load leave requests from LeaveRequestService
  }

  save(): void {
    const updatedApprovalRequest = this.approvalRequestForm.getRawValue();
    this.service.approvalrequests[this.service.selected] = updatedApprovalRequest;
    this.service.selected = -1;
    this.router.navigate(["/approval-requests"]);
  }
}
