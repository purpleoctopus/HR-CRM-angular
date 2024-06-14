import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  EmployeeForm: FormGroup;
  employee?:Employee;
  statusOptions : string[]= ['Active', 'Inactive'];
  subdivizions : string[]= ["HR","IT","Finance"];
  position : string[]= ['Manager', 'Developer', 'Analyst'];

  constructor(private router: Router, private service: EmployeeService, private fb: FormBuilder) {
    this.employee = service.employees.at(service.selected);
    this.EmployeeForm = this.fb.group({
      id: [{ value: this.service.employees.at(this.service.selected)?.id, disabled: true}],
      fullname: [{value: this.service.employees.at(this.service.selected)?.fullName, disabled: true}],
      subdivizion: [{value: this.service.employees.at(this.service.selected)?.subdivizion}],
      position: [{value:this.service.employees.at(this.service.selected)?.position}],
      status: [{value:this.service.employees.at(this.service.selected)?.status}],
      peoplepartner: [this.service.employees.at(this.service.selected)?.peoplePartnerId],
      ooo_balance: [{value: this.service.employees.at(this.service.selected)?.ooO_balance, disabled: true}]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.service.getDataAsync();

    this.EmployeeForm.setValue({
      id: [this.service.employees.at(this.service.selected)?.id],
      fullname: [this.service.employees.at(this.service.selected)?.fullName],
      subdivizion: [this.service.employees.at(this.service.selected)?.subdivizion],
      position: [this.service.employees.at(this.service.selected)?.position],
      status: [this.service.employees.at(this.service.selected)?.status],
      peoplepartner: [this.service.employees.at(this.service.selected)?.peoplePartnerId],
      ooo_balance: [this.service.employees.at(this.service.selected)?.ooO_balance]
    });
    this.EmployeeForm.controls['subdivizion'].setValue(this.service.employees.at(this.service.selected)?.subdivizion);
    this.EmployeeForm.controls['status'].setValue(this.service.employees.at(this.service.selected)?.status);
    this.EmployeeForm.controls['position'].setValue(this.service.employees.at(this.service.selected)?.position);
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
    const updatedEmployee = this.EmployeeForm.getRawValue();
    this.service.employees[this.service.selected] = updatedEmployee;
    this.service.selected = -1;
    this.router.navigate(["/employees"]);
  }
}