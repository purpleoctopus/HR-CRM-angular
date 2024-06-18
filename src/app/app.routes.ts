import { Routes } from '@angular/router';
import { EmployeeManagerComponent } from './core/features/employee/employee-manager.component';
import { ProjectsComponent } from './core/features/projects/projects.component';
import { LeaveRequestComponent } from './core/features/leave-request/leave-request.component';
import { ApprovalRequestComponent } from './core/features/approval-request/approval-request.component';
import { ApprovalRequestDetailsComponent } from './core/features/approval-request/approval-request-details/approval-request-details.component';
import { EmployeeDetailsComponent } from './core/features/employee/employee-details/employee-details.component';
import { EmployeeAddComponent } from './core/features/employee/employee-add/employee-add.component';
import { LoginComponent } from './core/features/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/employees',
        pathMatch: 'full'
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
        path:'projects',
        component: ProjectsComponent
    }
];
