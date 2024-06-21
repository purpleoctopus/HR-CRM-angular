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
  roles: string[] = [];
  constructor(private http: HttpClient) { 
    if(!this.username){
      this.stateSubject.next("Login");
    }else{
      this.stateSubject.next("Welcome, "+this.username);
      let stringlist : string[] | undefined = localStorage.getItem('roles')?.split(' ');
      this.roles = stringlist ? stringlist : [];
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
            localStorage.setItem('username',response.userName )
            this.stateSubject.next("Welcome, "+response.userName);
            this.roles = response.roles;
            localStorage.setItem('roles', this.roles.join(' '))
            localStorage.setItem('employeeid', response.employeeid)
          }
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('roles')
    localStorage.removeItem('username');
    localStorage.removeItem('employeeid');
    this.stateSubject.next("Login");
  }

  public get token(): string | null {
    return localStorage.getItem('token')
  }
  public get username(): string | null{
    return localStorage.getItem('username')
  }
  public get roleList(): string | null{
    return localStorage.getItem('roles')
  }
  public get employeeId(): string | null{
    return localStorage.getItem('employeeid')
  }
}
