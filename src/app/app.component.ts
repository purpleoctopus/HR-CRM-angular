import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeManagerComponent } from './core/features/employee-manager/employee-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeeManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Test-CRM';
}
