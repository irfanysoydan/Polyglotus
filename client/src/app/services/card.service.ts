import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Card } from '../models/card.model';
import { CreateCard } from '../models/create-card.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY3MTA5NTM1NiwiZXhwIjoxNjcxNzAwMTU2fQ.9mpt4e3Q_i43vCAHJSnZ0uSHsH-Yq6ddNgBoq-oeMj8',
  }),
};


@Injectable({
  providedIn: 'root'
})


export class CardService {

 cardsUrl = 'http://10.138.133.93:3000/cards/';
  constructor(private http: HttpClient) { }

  getAllCardsByDeckId(id: number): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl + id, httpOptions);
  }

  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(this.cardsUrl + id, httpOptions);
  }

  createCard(card: CreateCard,): Observable<string> {
    return this.http.post<string>(this.cardsUrl, card, httpOptions);
  }

  deleteCard(id: number): Observable<string> {
    
    return this.http.delete<string>(this.cardsUrl + id, httpOptions);
      
  }




}
