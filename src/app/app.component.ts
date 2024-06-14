import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeManagerComponent } from './core/features/employee/employee-manager.component';
import { HeaderSidebarComponent } from "./core/header-sidebar/header-sidebar.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, EmployeeManagerComponent, HeaderSidebarComponent, HttpClientModule]
})
export class AppComponent {
  title = 'Test-CRM';
}
