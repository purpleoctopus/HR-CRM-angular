import { Routes } from '@angular/router';
import { EmployeeManagerComponent } from './core/features/employee-manager/employee-manager.component';
import { ProjectsComponent } from './core/features/projects/projects.component';
import { LeaveRequestComponent } from './core/features/leave-request/leave-request.component';
import { ApprovalRequestComponent } from './core/features/approval-request/approval-request.component';

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
        path:'approval-requests',
        component: ApprovalRequestComponent
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
