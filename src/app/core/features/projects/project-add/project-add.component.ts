import { Component } from '@angular/core';
import { AddProject } from '../models/add-project.model';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ProjectService } from '../../../../services/features/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.css'
})
export class ProjectAddComponent {
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
      projectType: "",
      startDate: "",
      endDate: "",
      projectManagerId: "",
      comment: "",
      status: "",
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
    let newProject : AddProject = this.ProjectForm.getRawValue();
    newProject.projectType = this.ProjectForm.getRawValue().projectType;
    if(this.check(newProject)){
      await this.service.addDataAsync(newProject);
      this.router.navigate(["/projects"]);
    }
  }
  check(project: AddProject): boolean{
    return true;
  }
}
