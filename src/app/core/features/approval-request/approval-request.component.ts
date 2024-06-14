import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApprovalRequest } from './models/approval-request.model';
import { Router, RouterModule } from '@angular/router';
import { ApprovalRequestService } from '../../../services/approval-request.service';

@Component({
  selector: 'app-approval-request',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './approval-request.component.html',
  styleUrl: './approval-request.component.css'
})
export class ApprovalRequestComponent implements OnInit {
  approvalRequests: ApprovalRequest[];
  filteredApprovalRequests: ApprovalRequest[] = [];
  searchForm: FormGroup;

  constructor(private router: Router, private approvalRequestService: ApprovalRequestService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['']
    });
    this.approvalRequests = approvalRequestService.approvalrequests;
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

  openRequest(request: number): void{
    this.approvalRequestService.selected = request;
    this.router.navigate(["/approval-requests-detail"]);
  }

  approveRequest(request: any): void {
    //this.approvalRequestService.approveRequest(request).subscribe(() => this.loadApprovalRequests());
  }

  rejectRequest(request: any): void {
    //this.approvalRequestService.rejectRequest(request).subscribe(() => this.loadApprovalRequests());
  }
}
