import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApprovalRequest } from './models/approval-request.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-approval-request',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './approval-request.component.html',
  styleUrl: './approval-request.component.css'
})
export class ApprovalRequestComponent implements OnInit {
  approvalRequests: ApprovalRequest[] = [];
  filteredApprovalRequests: ApprovalRequest[] = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['']
    });
    this.approvalRequests.push({id: "1", approver:"Denys", comment:"Today", leaverequest: "2"});
  }

  ngOnInit(): void {
    this.loadApprovalRequests();
    this.searchForm.get('name')?.valueChanges.subscribe(value => this.filterApprovalRequests(value));
  }

  loadApprovalRequests(): void {
    this.filteredApprovalRequests=this.approvalRequests;
    /*this.approvalRequestService.getApprovalRequests().subscribe(data => {
      this.approvalRequests = data;
      this.filteredApprovalRequests = data;
    });*/
  }

  sortApprovalRequests(column: string): void {
    //this.filteredApprovalRequests.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
  }

  filterApprovalRequests(searchTerm: string): void {
    
  }

  approveRequest(request: any): void {
    //this.approvalRequestService.approveRequest(request).subscribe(() => this.loadApprovalRequests());
  }

  rejectRequest(request: any): void {
    //this.approvalRequestService.rejectRequest(request).subscribe(() => this.loadApprovalRequests());
  }
}
