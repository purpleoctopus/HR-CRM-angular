import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/features/project.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Project } from './models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  leaveRequests: any[] = [];
  filteredProjects: Project[] = [];
  searchForm: FormGroup;
  projects: Project[] = [];

  constructor(private router: Router,private authService: AuthService, private service: ProjectService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    if(!this.authService.roles.includes('pm') && !this.authService.roles.includes('hr manager')){
      this.router.navigate(['/no-access']);
    }
    await this.service.getDataAsync();
    this.projects = this.service.projects;
    this.filteredProjects = this.projects;
    this.searchForm.get('name')?.valueChanges.subscribe(value => this.filterProjects(value));
  }

  loadProjects(): void {
    /*this.leaveRequestService.getLeaveRequests().subscribe(data => {
      this.leaveRequests = data;
      this.filteredLeaveRequests = data;
    });*/
  }
  filterProjects(value: any): void {
    
  }
  sortProjects(column: string) {
    
  }
  deactivateProject(request: Project) {
    request.status = "Inactive"
    this.service.updateDataAsync(request)
  }
  activateProject(request: Project) {
    request.status = "Active"
    this.service.updateDataAsync(request)
  }
  openProject(request: number) {
    this.service.selected = request;
    this.router.navigate(["/project-details"])
  }
  addProject(){
    this.router.navigate(["/project-add"])
  }
}
