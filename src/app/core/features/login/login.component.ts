import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginModel } from '../employee/models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm: FormGroup;
  constructor(private router : Router, private service : AuthService, private fb: FormBuilder) {
    this.LoginForm = this.fb.group({
      username: "",
      password: ""
    });
  }
  save() {
    let loginData: LoginModel = this.LoginForm.getRawValue();
    this.service.login(loginData).subscribe(response=> {
      if (response && response.token) {
        this.router.navigate(["/home-page"]);
      }else{
        console.error("Login error");
      }
    });
  }
}
