import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApprovalRequest } from './models/approval-request.model';
import { Router, RouterModule } from '@angular/router';
import { ApprovalRequestService } from '../../../services/features/approval-request.service';
import { AuthService } from '../../../services/auth.service';
import { LeaveRequest } from '../leave-request/models/leave-request.model';

@Component({
  selector: 'app-approval-request',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './approval-request.component.html',
  styleUrl: './approval-request.component.css'
})
export class ApprovalRequestComponent implements OnInit {
  approvalRequests: ApprovalRequest[] = [];
  searchForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private service: ApprovalRequestService, private fb: FormBuilder) {
    if(!this.authService.roles.includes('pm') && !this.authService.roles.includes('hr')){
      this.router.navigate(['/no-access']);
    }
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    await this.service.getDataAsync();
    this.approvalRequests = this.service.approvalRequests;
    this.searchForm.get('name')?.valueChanges.subscribe(value => this.filterApprovalRequests(value));
  }

  sortApprovalRequests(column: string): void {
    //this.filteredApprovalRequests.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
  }

  filterApprovalRequests(searchTerm: string): void {
    
  }

  openRequest(request: number): void{
    this.service.selected = request;
    this.router.navigate(["/approval-requests-detail"]);
  }

  async approveRequest(request: ApprovalRequest): Promise<void> {
    let req : ApprovalRequest = {
      id : request.id,
      approverId: this.authService.employeeId,
      leaveRequestId: request.leaveRequestId,
      comment: request.comment,
      status : "Approved"
    };
    console.log(req)
    await this.service.updateDataAsync(req);
    await this.service.getDataAsync();
  }

  async rejectRequest(request: ApprovalRequest): Promise<void> {
    let req : ApprovalRequest = {
      id : request.id,
      approverId: this.authService.employeeId,
      leaveRequestId: request.leaveRequestId,
      comment: request.comment,
      status : "Rejected"
    };
    console.log(req)
    await this.service.updateDataAsync(req);
    await this.service.getDataAsync();
  }
}
