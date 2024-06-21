import { Injectable, OnInit } from '@angular/core';
import { Employee } from '../../core/features/employee/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AddEmployee } from '../../core/features/employee/models/add-employee.model';
import { RegisterModel } from '../../core/features/employee/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [];
  selected: number = -1;
  constructor(private http: HttpClient) { }
  async addDataAsync(employee:RegisterModel){
    console.log(employee)
    this.employees.push(await firstValueFrom(this.addEmployee(employee)))
  }
  async getDataAsync() {
    this.employees = await firstValueFrom(this.getEmployees());
  }
  async updateDataAsync(employee:Employee) : Promise<AddEmployee> {
    let request: AddEmployee = employee;
    let id: string = employee.id;
    return await firstValueFrom(this.updateEmployee(id,request));
  }
  private addEmployee(employee : RegisterModel):Observable<Employee>{
    return this.http.post<Employee>(`${environment.apiUrl}/Account/register`, employee);
  }
  private updateEmployee(id: string,employee : AddEmployee):Observable<AddEmployee>{
    console.log(employee); console.log(id)
    return this.http.put<AddEmployee>(`${environment.apiUrl}/Employee/${id}`, employee)
  }
  private getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${environment.apiUrl}/Employee`); 
  }
}
