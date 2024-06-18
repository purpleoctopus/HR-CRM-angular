import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Employee } from './models/employee.model';
import { EmployeeService } from '../../../services/features/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-manager',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-manager.component.html',
  styleUrl: './employee-manager.component.css'
})
export class EmployeeManagerComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchForm: FormGroup;

  constructor(private router: Router,private service: EmployeeService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    await this.service.getDataAsync();
    this.employees = this.service.employees;
    this.filteredEmployees = this.employees;
    this.searchForm.get('name')?.valueChanges.subscribe(value => this.filterEmployees(value));
  }

  sortEmployees(column: string): void {
    //this.filteredEmployees.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
  }

  filterEmployees(searchTerm: string): void {
    this.filteredEmployees = this.employees.filter(employee => 
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  addEmployee(){
    this.router.navigate(["/employee-add"]);
  }
  openEmployee(request: number): void{
    this.service.selected = request;
    this.router.navigate(["/employee-detail"]);
  }

  activateEmployee(employee: Employee): void {
    employee.status = "Active";
    this.service.updateDataAsync(employee);
  }

  deactivateEmployee(employee: any): void {
    employee.status = "Inactive";
    this.service.updateDataAsync(employee);
  }
}
