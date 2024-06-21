import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../../services/features/employee.service';
import { AddEmployee } from '../models/add-employee.model';
import { CommonModule } from '@angular/common';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {
  EmployeeForm: FormGroup;
  statusOptions : string[]= ['Active', 'Inactive'];
  subdivizions : string[]= ["HR","IT","Finance"];
  position : string[]= ['Employee', 'ProjectManager', 'HRmanager'];
  isUsernameValid: boolean = true;
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;
  isPartnerIdValid: boolean = true;
  isNameValid: boolean = true;
  isSubdivizionValid: boolean = true;
  isPositionValid: boolean = true;
  isStatusValid: boolean = true;

  constructor(private router: Router, private authService: AuthService, private service: EmployeeService, private fb: FormBuilder) {
    if(!this.authService.roles.includes('hr')){
      this.router.navigate(['/no-access']);
    }
    this.EmployeeForm = this.fb.group({
      username: "",
      email: "",
      password: "",
      fullName: "",
      subdivizion: "",
      position: {value :"Employee", disabled: true},
      status: "",
      peoplePartnerId: "",
      ooo_balance: 0
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
    let newEmployee : RegisterModel = this.EmployeeForm.getRawValue();
    newEmployee.roles = [newEmployee.status];
    newEmployee.position = this.EmployeeForm.getRawValue().position.value;
    if(this.check(newEmployee)){
      await this.service.addDataAsync(newEmployee);
      this.router.navigate(["/employees"]);
    }
  }

  check(value: RegisterModel) : boolean{
    if(value.fullName?.length >= 3 && value.fullName?.length < 18){
      this.isNameValid = true;
    }else{
      this.isNameValid = false;
      this.EmployeeForm.get('fullName')?.valueChanges.subscribe(x =>
        {
          this.isNameValid = true;
        }
      )
      return false;
    }
    if(value.subdivizion?.length > 0){
      this.isSubdivizionValid = true;
    }else{
      this.isSubdivizionValid = false;
      this.EmployeeForm.get('subdivizion')?.valueChanges.subscribe(x =>
        {
          this.isSubdivizionValid = true;
        }
      )
      return false;
    }
   
    if(value.status?.length > 0){
      this.isStatusValid = true;
    }else{
      this.isStatusValid = false;
      this.EmployeeForm.get('status')?.valueChanges.subscribe(x =>
        {
          this.isStatusValid = true;
        }
      )
      return false;
    }
    if(value.peoplePartnerId?.length > 0 && value.peoplePartnerId?.length < 36){
      this.isPartnerIdValid = false;
      return false;
    }else{
      this.isPartnerIdValid = true;
    }
    return true;
  }
}