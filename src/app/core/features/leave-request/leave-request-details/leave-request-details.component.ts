import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { LeaveRequestService } from '../../../../services/features/leave-request.service';
import { AddLeaveRequest } from '../models/add-leave-request.model';
import { LeaveRequest } from '../models/leave-request.model';

@Component({
  selector: 'app-leave-request-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './leave-request-details.component.html',
  styleUrl: './leave-request-details.component.css'
})
export class LeaveRequestDetailsComponent implements OnInit {
  LeaveRequestForm: FormGroup;
  leaveRequests: LeaveRequest[] = [];
  absenceReasons: string[] = ["SickLeave","Vacation","PersonalLeave","Other"];
  constructor(private router: Router, private authService: AuthService, public service: LeaveRequestService, private fb: FormBuilder) {
    if(!this.authService.roles.includes('pm') && !this.authService.roles.includes('hr') && !this.authService.roles.includes('employee')){
      this.router.navigate(['/no-access']);
    }
    this.LeaveRequestForm = fb.group({
      id: "",
      employeeId: "",
      absenceReason: "",
      startDate: "",
      endDate: "",
      comment:"",
      status: ""
    });
    /*this.EmployeeForm.get('peoplePartnerId')?.valueChanges.subscribe(value => {
      if(value.length > 0 && value.length < 36){
        this.isPartnerIdValid = false;
      }else{
        this.isPartnerIdValid = true;
      }
    }
    )*/
  }
  async ngOnInit(): Promise<void> {
    await this.service.getDataAsync();
    let statusCheck : boolean = this.service.leaveRequests[this.service.selected].status != "New";
    this.leaveRequests = this.service.leaveRequests;
    this.LeaveRequestForm = this.fb.group({
      id: {value: this.service.leaveRequests[this.service.selected].id, disabled: true},
      employeeId: {value: this.service.leaveRequests[this.service.selected].employeeId, disabled: true},
      absenceReason: {value: this.service.leaveRequests[this.service.selected].absenceReason, disabled: statusCheck},
      startDate: {value: this.service.leaveRequests[this.service.selected].startDate, disabled: statusCheck},
      endDate: {value: this.service.leaveRequests[this.service.selected].endDate, disabled: statusCheck},
      comment: {value: this.service.leaveRequests[this.service.selected].comment, disabled: statusCheck},
      status: {value: this.service.leaveRequests[this.service.selected].status, disabled: true}
    });
  }

  async save(): Promise<void> {
    let newLeaveRequest : LeaveRequest = this.service.leaveRequests[this.service.selected];
    newLeaveRequest.startDate = this.LeaveRequestForm.getRawValue().startDate
    newLeaveRequest.endDate = this.LeaveRequestForm.getRawValue().endDate
    newLeaveRequest.comment = this.LeaveRequestForm.getRawValue().comment
    newLeaveRequest.absenceReason = this.LeaveRequestForm.getRawValue().absenceReason;
    if(this.check(newLeaveRequest)){
      await this.service.updateDataAsync(newLeaveRequest);
      this.router.navigate(["/leave-requests"]);
    }
  }
  check(project: AddLeaveRequest): boolean{
    return true;
  }
}
