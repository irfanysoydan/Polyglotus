import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  baseServerUrl = "http://10.138.133.93:3000/auth/";

  loginUser(user: User): Observable<Login> {
    return this.http.post<Login>(this.baseServerUrl + "login", user, httpOptions);
  }
  registerUser(user: User): Observable<string> {
    return this.http.post<string>(this.baseServerUrl + "register", user, httpOptions);
  }

  forgotPassword(email: string): Observable<string> {

    return this.http.post<string>(this.baseServerUrl + "forgotPassword", { email: email }, httpOptions);
  }

}
