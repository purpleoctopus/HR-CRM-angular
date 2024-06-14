import { Injectable, OnInit } from '@angular/core';
import { Employee } from '../core/features/employee/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [];
  selected: number = -1;
  constructor(private http: HttpClient) { }
  async getDataAsync() {
    this.employees = await firstValueFrom(this.getEmployees());
    console.log(this.employees)
  }
  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${environment.apiUrl}/Employee`); 
  }
}
