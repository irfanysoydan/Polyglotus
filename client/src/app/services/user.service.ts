import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ResponseModel } from '../models/response.model';
import { LocalService } from './local.service';

const httpOptions = {
  headers: new HttpHeaders(),
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private localStore: LocalService) {
    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', "Bearer " + this.localStore.getData("token"));
  }
  usersUrl = environment.apiUrl + "users/";

  getUserById(id: number): Observable<ResponseModel> {
    console.log(httpOptions.headers);
    return this.http.get<ResponseModel>(this.usersUrl + id, httpOptions);
  }

  getAllUsers(): Observable<ResponseModel[]> {
    return this.http.get<ResponseModel[]>(this.usersUrl, httpOptions);
  }

  deleteUser(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(this.usersUrl + id, httpOptions);
  }

  updateUserById(id: number, user: User): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(this.usersUrl + id, user, httpOptions);
  }

}
