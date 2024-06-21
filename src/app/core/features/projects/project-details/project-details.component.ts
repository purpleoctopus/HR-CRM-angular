import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ProjectService } from '../../../../services/features/project.service';
import { AddProject } from '../models/add-project.model';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  ProjectForm: FormGroup;
  statusOptions : string[]= ['Active', 'Inactive'];
  projectTypes: string[] = ["Internal","External","Research","Development"];
  projectType: boolean = true;
  startDate: boolean = true;
  endDate: boolean = true;
  projectManager: boolean = true;
  comment: boolean = true;
  status: boolean = true;

  constructor(private router: Router, private authService: AuthService, private service: ProjectService, private fb: FormBuilder) {
    if(!this.authService.roles.includes('pm')){
      this.router.navigate(['/no-access']);
    }
    this.ProjectForm = this.fb.group({
      id: {value: this.service.projects[this.service.selected].id, disabled: true},
      projectType: this.service.projects[this.service.selected].projectType,
      startDate: this.service.projects[this.service.selected].startDate,
      endDate: this.service.projects[this.service.selected].endDate,
      projectManagerId: this.service.projects[this.service.selected].projectManagerId,
      comment: this.service.projects[this.service.selected].comment,
      status: this.service.projects[this.service.selected].status,
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
    let newProject : Project = this.ProjectForm.getRawValue();
    newProject.projectType = this.ProjectForm.getRawValue().projectType;
    if(this.check(newProject)){
      await this.service.updateDataAsync(newProject);
      this.router.navigate(["/projects"]);
    }
  }
  check(project: AddProject): boolean{
    return true;
  }
}
