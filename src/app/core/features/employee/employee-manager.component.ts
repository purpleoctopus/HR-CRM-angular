import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Employee } from './models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
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
    this.employees = service.employees;
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.searchForm.get('name')?.valueChanges.subscribe(value => this.filterEmployees(value));
  }

  loadEmployees(): void {
    /*this.employeeService.getEmployees().subscribe((data: any[]) => {
      this.employees = data;
      this.filteredEmployees = data;
    });*/
  }

  sortEmployees(column: string): void {
    //this.filteredEmployees.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
  }

  filterEmployees(searchTerm: string): void {
    /*this.filteredEmployees = this.employees.filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );*/
  }

  openEmployee(request: number): void{
    this.service.selected = request;
    this.router.navigate(["/employee-detail"]);
  }

  addEmployee(employee: any): void {
    //this.employeeService.addEmployee(employee).subscribe(() => this.loadEmployees());
  }

  updateEmployee(employee: any): void {
    //this.employeeService.updateEmployee(employee).subscribe(() => this.loadEmployees());
  }

  deactivateEmployee(employee: any): void {
    //this.employeeService.deactivateEmployee(employee).subscribe(() => this.loadEmployees());
  }
}
