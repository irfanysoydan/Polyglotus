import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjcxMDk4MTIxLCJleHAiOjE2NzE3MDI5MjF9.s3JxqiNvuKJ1291t6VvIGVoYTbjUHS85A3zMk6LMm8k',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  usersUrl = 'http://192.168.43.107:3000/users/';

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + id, httpOptions);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, httpOptions);
  }


  deleteUser(id: number): Observable<string> {

    return this.http.delete<string>(this.usersUrl + id, httpOptions);

  }

  updateUserById(id: number, user: User): Observable<string> {
    return this.http.put<string>(this.usersUrl + id, user, httpOptions);
  }

}
