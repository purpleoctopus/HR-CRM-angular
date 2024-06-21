import { Routes } from '@angular/router';
import { EmployeeManagerComponent } from './core/features/employee/employee-manager.component';
import { ProjectsComponent } from './core/features/projects/projects.component';
import { LeaveRequestComponent } from './core/features/leave-request/leave-request.component';
import { ApprovalRequestComponent } from './core/features/approval-request/approval-request.component';
import { ApprovalRequestDetailsComponent } from './core/features/approval-request/approval-request-details/approval-request-details.component';
import { EmployeeDetailsComponent } from './core/features/employee/employee-details/employee-details.component';
import { EmployeeAddComponent } from './core/features/employee/employee-add/employee-add.component';
import { LoginComponent } from './core/features/login/login.component';
import { NoAccessComponent } from './core/no-access/no-access.component';
import { HomePageComponent } from './core/home-page/home-page.component';
import { ProjectDetailsComponent } from './core/features/projects/project-details/project-details.component';
import { ProjectAddComponent } from './core/features/projects/project-add/project-add.component';
import { LeaveRequestAddComponent } from './core/features/leave-request/leave-request-add/leave-request-add.component';
import { LeaveRequestDetailsComponent } from './core/features/leave-request/leave-request-details/leave-request-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home-page',
        pathMatch: 'full'
    },
    {
        path:'home-page',
        component: HomePageComponent
    },
    {
        path:'no-access',
        component: NoAccessComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'employees',
        component: EmployeeManagerComponent
    },
    {
        path:'employee-detail',
        component: EmployeeDetailsComponent
    },
    {
        path:'employee-add',
        component: EmployeeAddComponent
    },
    {
        path:'approval-requests',
        component: ApprovalRequestComponent
    },
    {
        path:'approval-requests-detail',
        component: ApprovalRequestDetailsComponent
    },
    {
        path:'leave-requests',
        component: LeaveRequestComponent
    },
    {
        path:'leave-request-add',
        component: LeaveRequestAddComponent
    },
    {
        path:'leave-request-details',
        component: LeaveRequestDetailsComponent
    },
    {
        path:'projects',
        component: ProjectsComponent
    },
    {
        path:'project-details',
        component: ProjectDetailsComponent
    },
    {
        path:'project-add',
        component: ProjectAddComponent
    }
];
