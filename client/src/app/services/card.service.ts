import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { CreateCard } from '../models/create-card.model';
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

export class CardService {

  cardsUrl = environment.apiUrl + "cards/";
  constructor(private http: HttpClient) { }

  getAllCardsByDeckId(id: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.cardsUrl + id, httpOptions);
  }

  getCardById(id: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.cardsUrl + id, httpOptions);
  }

  createCard(card: CreateCard,): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.cardsUrl, card, httpOptions);
  }

  deleteCard(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(this.cardsUrl + id, httpOptions);
  }
}
