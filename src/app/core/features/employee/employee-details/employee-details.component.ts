import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../../../services/features/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  EmployeeForm: FormGroup;
  statusOptions : string[]= ['Active', 'Inactive'];
  subdivizions : string[]= ["HR","IT","Finance"];
  position : string[]= ['Employee', 'ProjectManager', 'HRmanager'];

  constructor(private router: Router, private authService: AuthService, private service: EmployeeService, private fb: FormBuilder) {
    if(!this.authService.roles.includes('pm') && !this.authService.roles.includes('hr manager')){
      this.router.navigate(['/no-access']);
    }
    this.EmployeeForm = this.fb.group({
      id: { value: this.service.employees.at(this.service.selected)?.id, disabled: true},
      fullname: {value: this.service.employees.at(this.service.selected)?.fullName, disabled: false},
      subdivizion: {value: this.service.employees.at(this.service.selected)?.subdivizion},
      position: {value:this.service.employees.at(this.service.selected)?.position, disabled: true},
      status: {value:this.service.employees.at(this.service.selected)?.status},
      peoplepartnerid: {value : this.service.employees.at(this.service.selected)?.peoplePartnerId, disabled: false},
      ooo_balance: {value: this.service.employees.at(this.service.selected)?.ooO_balance, disabled: true}
    });
  }

  async ngOnInit(): Promise<void> {
    await this.service.getDataAsync();

    this.EmployeeForm.setValue({
      id: this.service.employees.at(this.service.selected)?.id,
      fullname: this.service.employees.at(this.service.selected)?.fullName,
      subdivizion: this.service.employees.at(this.service.selected)?.subdivizion,
      position: this.service.employees.at(this.service.selected)?.position,
      status: this.service.employees.at(this.service.selected)?.status,
      peoplepartnerid: this.service.employees.at(this.service.selected)?.peoplePartnerId,
      ooo_balance: this.service.employees.at(this.service.selected)?.ooO_balance
    });
    this.EmployeeForm.controls['subdivizion'].setValue(this.service.employees.at(this.service.selected)?.subdivizion);
    this.EmployeeForm.controls['status'].setValue(this.service.employees.at(this.service.selected)?.status);
    this.EmployeeForm.controls['position'].setValue(this.service.employees.at(this.service.selected)?.position);
  }

  async save(): Promise<void> {
    let updatedEmployee : Employee = this.EmployeeForm.getRawValue();
    this.service.employees[this.service.selected] = updatedEmployee;
    await this.service.updateDataAsync(updatedEmployee);
    this.service.selected = -1;
    this.router.navigate(["/employees"]);
  }
}