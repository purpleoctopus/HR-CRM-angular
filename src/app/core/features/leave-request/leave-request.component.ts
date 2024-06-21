import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LeaveRequestService } from '../../../services/features/leave-request.service';
import { LeaveRequest } from './models/leave-request.model';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  searchForm: FormGroup;

  constructor(private router: Router,public authService: AuthService, private service: LeaveRequestService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    if(!this.authService.roles.includes('pm') && !this.authService.roles.includes('hr') && !this.authService.roles.includes('employee')){
      this.router.navigate(['/no-access']);
    }
    this.leaveRequests = await this.service.getDataAsync();
    this.searchForm.get('name')?.valueChanges.subscribe(value => this.filterLeaveRequests(value));
  }
  sortLeaveRequests(column: string): void {
    //this.leaveRequests.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
  }

  filterLeaveRequests(searchTerm: string): void {
    
  }

  addLeaveRequest(){
    this.router.navigate(["/leave-request-add"])
  }

  async submitRequest(leaveRequest: LeaveRequest): Promise<void> {
    let req : LeaveRequest = {
      id : leaveRequest.id,
      employeeId : leaveRequest.employeeId,
      absenceReason : leaveRequest.absenceReason,
      startDate : leaveRequest.startDate,
      endDate : leaveRequest.endDate,
      comment : leaveRequest.comment,
      status : "Submitted"
    };
    await this.service.updateDataAsync(req);
    req.status = leaveRequest.status
    await this.service.getDataAsync();
  }

  async cancelRequest(leaveRequest: LeaveRequest): Promise<void> {
    let req : LeaveRequest = {
      id : leaveRequest.id,
      employeeId : leaveRequest.employeeId,
      absenceReason : leaveRequest.absenceReason,
      startDate : leaveRequest.startDate,
      endDate : leaveRequest.endDate,
      comment : leaveRequest.comment,
      status : "Canceled"
    };
    await this.service.updateDataAsync(req);
    req.status = leaveRequest.status
    await this.service.getDataAsync();
  }
  openRequest(request: number): void{
    this.service.selected = request;
    this.router.navigate(["/leave-request-details"])
  }
}
