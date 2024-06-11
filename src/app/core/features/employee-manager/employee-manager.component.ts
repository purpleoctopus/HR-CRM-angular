import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-manager',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-manager.component.html',
  styleUrl: './employee-manager.component.css'
})
export class EmployeeManagerComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    this.filteredEmployees.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
  }

  filterEmployees(searchTerm: string): void {
    this.filteredEmployees = this.employees.filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
