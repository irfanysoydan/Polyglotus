import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Deck } from '../models/deck.model';
import { ResponseModel } from '../models/response.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjcxMjAwNDk2LCJleHAiOjE2NzE4MDUyOTZ9.q6-EbhvIX3mGSjRSokFd1n3jlKv5uJ0RL8ZZH73qiJA',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  public decks: Deck[] | any;
  public deck: Deck | any;
  decksUrl = environment.apiUrl + 'decks/';

  constructor(private http: HttpClient) { }

  getDecks(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.decksUrl, httpOptions)
  }

  getDeckId(id: number): Observable<Deck> {
    return this.http.get<ResponseModel>(this.decksUrl + id, httpOptions)
      .pipe(map((response: ResponseModel) => {
        if (response.isSuccessful) {
          return this.deck = response.data;
        } else {
          return {};
        }
      }));
  }
  createDeck(deck: Deck): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.decksUrl, deck, httpOptions)
  }

  deleteDeck(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(this.decksUrl + id, httpOptions);
  }
}
