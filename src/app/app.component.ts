import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeManagerComponent } from './core/features/employee-manager/employee-manager.component';
import { HeaderSidebarComponent } from "./core/header-sidebar/header-sidebar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, EmployeeManagerComponent, HeaderSidebarComponent]
})
export class AppComponent {
  title = 'Test-CRM';
}
