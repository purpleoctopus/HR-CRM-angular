import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-approval-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './approval-request.component.html',
  styleUrl: './approval-request.component.css'
})
export class ApprovalRequestComponent implements OnInit {
  approvalRequests: any[] = [];
  filteredApprovalRequests: any[] = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.loadApprovalRequests();
    this.searchForm.get('name')?.valueChanges.subscribe(value => this.filterApprovalRequests(value));
  }

  loadApprovalRequests(): void {
    /*this.approvalRequestService.getApprovalRequests().subscribe(data => {
      this.approvalRequests = data;
      this.filteredApprovalRequests = data;
    });*/
  }

  sortApprovalRequests(column: string): void {
    this.filteredApprovalRequests.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
  }

  filterApprovalRequests(searchTerm: string): void {
    this.filteredApprovalRequests = this.approvalRequests.filter(request => 
      request.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  approveRequest(request: any): void {
    //this.approvalRequestService.approveRequest(request).subscribe(() => this.loadApprovalRequests());
  }

  rejectRequest(request: any): void {
    //this.approvalRequestService.rejectRequest(request).subscribe(() => this.loadApprovalRequests());
  }
}
