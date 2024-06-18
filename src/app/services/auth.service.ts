import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginModel } from '../core/features/employee/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private stateSubject = new BehaviorSubject<string>('initial value');
  username$: Observable<string> = this.stateSubject.asObservable();
  constructor(private http: HttpClient) { 
    if(!this.username){
      this.stateSubject.next("Login");
    }else{
      this.stateSubject.next("Welcome, "+this.username);
    }
  }

  login(loginData: LoginModel): Observable<any> {
    const username = loginData.username;
    const password = loginData.password;
    return this.http.post<any>(`${environment.apiUrl}/Account/login`, { username, password })
      .pipe(
        map(response => {
          // Збереження токена в localStorage
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username',response.user.userName )
            this.stateSubject.next("Welcome, "+response.user.userName);
          }
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  public get token(): string | null {
    return localStorage.getItem('token');
  }
  public get username(): string | null{
    return localStorage.getItem('username')
  }
}
