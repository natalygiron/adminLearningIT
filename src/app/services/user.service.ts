import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient,
               private router: Router) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }

  validateToken() : Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap ( (resp:any) => {
        localStorage.setItem('token', resp.token )
      }),
      map(resp => true),
      catchError( error => of(false))
    );
  }

  createUser( formData: RegisterForm) {

    return this.http.post(`${base_url}/users`, formData);
  }

  login( formData: LoginForm ) {
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token', resp.token )
                      })
                    )
  }


}
