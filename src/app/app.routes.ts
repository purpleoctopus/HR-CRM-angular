import { Routes } from '@angular/router';
import { EmployeeManagerComponent } from './core/features/employee/employee-manager.component';
import { ProjectsComponent } from './core/features/projects/projects.component';
import { LeaveRequestComponent } from './core/features/leave-request/leave-request.component';
import { ApprovalRequestComponent } from './core/features/approval-request/approval-request.component';
import { ApprovalRequestDetailsComponent } from './core/features/approval-request/approval-request-details/approval-request-details.component';
import { EmployeeDetailsComponent } from './core/features/employee/employee-details/employee-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/employees',
        pathMatch: 'full'
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
