import { Component } from '@angular/core';
import { LeaveRequestService } from '../../../../services/features/leave-request.service';
import { AddLeaveRequest } from '../models/add-leave-request.model';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-leave-request-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './leave-request-add.component.html',
  styleUrl: './leave-request-add.component.css'
})
export class LeaveRequestAddComponent {
  LeaveRequestForm: FormGroup;
  absenceReasons: string[] = ["SickLeave","Vacation","PersonalLeave","Other"];

  constructor(private router: Router, private authService: AuthService, private service: LeaveRequestService, private fb: FormBuilder) {
    if(!this.authService.roles.includes('pm') && !this.authService.roles.includes('hr') && !this.authService.roles.includes('employee')){
      this.router.navigate(['/no-access']);
    }
    this.LeaveRequestForm = this.fb.group({
      absenceReason: "",
      startDate: "",
      endDate: "",
      comment: "",
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

  async save(): Promise<void> {
    let newLeaveRequest : AddLeaveRequest = this.LeaveRequestForm.getRawValue();
    newLeaveRequest.absenceReason = this.LeaveRequestForm.getRawValue().absenceReason;
    newLeaveRequest.employeeId = this.authService.employeeId;
    if(this.check(newLeaveRequest)){
      await this.service.addDataAsync(newLeaveRequest);
      this.router.navigate(["/leave-requests"]);
    }
  }
  check(project: AddLeaveRequest): boolean{
    return true;
  }
}
