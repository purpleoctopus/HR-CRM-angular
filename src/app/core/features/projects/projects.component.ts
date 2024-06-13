import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  leaveRequests: any[] = [];
  filteredProjects: any[] = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.loadProjects();
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
  deactivateProject(request: any) {
    
  }
  updateProject(request: any) {
    
  }
}
