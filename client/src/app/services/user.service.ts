import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ResponseModel } from '../models/response.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjcxMjAwNDk2LCJleHAiOjE2NzE4MDUyOTZ9.q6-EbhvIX3mGSjRSokFd1n3jlKv5uJ0RL8ZZH73qiJA',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  usersUrl = environment.apiUrl + "users/";

  getUserById(id: number): Observable<ResponseModel> {
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
