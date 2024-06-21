import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AddEmployee } from '../../core/features/employee/models/add-employee.model';
import { Employee } from '../../core/features/employee/models/employee.model';
import { RegisterModel } from '../../core/features/employee/models/register.model';
import { Project } from '../../core/features/projects/models/project.model';
import { AddProject } from '../../core/features/projects/models/add-project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];
  selected: number = -1;
  constructor(private http: HttpClient) { }
  async addDataAsync(project:AddProject){
    this.projects.push(await firstValueFrom(this.addProject(project)))
  }
  async getDataAsync() {
    this.projects = await firstValueFrom(this.getProjects());
  }
  async updateDataAsync(project:Project) : Promise<AddProject> {
    console.log(project)
    let request: AddProject = project;
    let id: string = project.id;
    return await firstValueFrom(this.updateProject(id,request));
  }
  private addProject(project : AddProject):Observable<Project>{
    return this.http.post<Project>(`${environment.apiUrl}/Project`, project);
  }
  private updateProject(id: string,project : AddProject):Observable<AddProject>{
    return this.http.put<AddProject>(`${environment.apiUrl}/Project/${id}`, project)
  }
  private getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${environment.apiUrl}/Project`); 
  }
}
