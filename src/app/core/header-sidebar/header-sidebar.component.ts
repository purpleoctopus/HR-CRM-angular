import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-sidebar.component.html',
  styleUrl: './header-sidebar.component.css'
})
export class HeaderSidebarComponent implements OnInit {
  username: string = "Login";
  constructor(public service : AuthService) {
  }
  ngOnInit(): void {
    this.service.username$.subscribe((response: string) => {this.username = response;})
  }
}
