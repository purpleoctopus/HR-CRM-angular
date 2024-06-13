import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent implements OnInit {
  leaveRequests: any[] = [];
  filteredLeaveRequests: any[] = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.loadLeaveRequests();
    this.searchForm.get('name')?.valueChanges.subscribe(value => this.filterLeaveRequests(value));
  }

  loadLeaveRequests(): void {
    /*this.leaveRequestService.getLeaveRequests().subscribe(data => {
      this.leaveRequests = data;
      this.filteredLeaveRequests = data;
    });*/
  }

  sortLeaveRequests(column: string): void {
    this.filteredLeaveRequests.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
  }

  filterLeaveRequests(searchTerm: string): void {
    this.filteredLeaveRequests = this.leaveRequests.filter(request => 
      request.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  approveRequest(request: any): void {
    //this.leaveRequestService.approveRequest(request).subscribe(() => this.loadLeaveRequests());
  }

  rejectRequest(request: any): void {
    //this.leaveRequestService.rejectRequest(request).subscribe(() => this.loadLeaveRequests());
  }
}
