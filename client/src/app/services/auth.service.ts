import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { ResponseModel } from '../models/response.model';

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

  baseServerUrl = environment.apiUrl + "auth/";

  loginUser(user: User): Observable<Login> {
    return this.http.post<Login>(this.baseServerUrl + "login", user, httpOptions);
  }
  registerUser(user: User): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.baseServerUrl + "register", user, httpOptions);
  }

  forgotPassword(email: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.baseServerUrl + "forgotPassword", { email: email }, httpOptions);
  }

  resetPassword(pass: string, token: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.baseServerUrl + "resetPassword?token=" + token, { password: pass }, httpOptions);
  }

}
