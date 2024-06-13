import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-approval-request-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './approval-request-details.component.html',
  styleUrl: './approval-request-details.component.css'
})
export class ApprovalRequestDetailsComponent implements OnInit {
  approvalRequestId: string = '';
  approvalRequestForm: FormGroup;
  employees:any[] = [];
  leaveRequests:any[] = [];
  statusOptions = ['New', 'Approved', 'Rejected'];

  constructor(private fb: FormBuilder) {
    this.approvalRequestForm = this.fb.group({
      id: [{ value: this.approvalRequestId, disabled: true }],
      approver: [''],
      leaveRequest: [''],
      status: [{ value: 'New', disabled: false }],
      comment: ['']
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
    /*this.approvalRequestService.updateApprovalRequest(this.approvalRequestId, updatedApprovalRequest).subscribe(() => {
      // Handle success
    });*/
  }
}
