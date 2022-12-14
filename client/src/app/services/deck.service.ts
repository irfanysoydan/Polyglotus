import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Deck } from '../models/deck.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY3MTAyODEzMywiZXhwIjoxNjcxNjMyOTMzfQ.NX6dHizhKMD9dKfOUoeNMQLqkYtZjE2XL1mGSgsnkxQ',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  decksUrl = 'http://10.138.133.93:3000';

  constructor(private http: HttpClient) {}

  getDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(this.decksUrl + '/decks', httpOptions);
  }

  getDeckId(id: number): Observable<Deck> {
    return this.http.get<Deck>(this.decksUrl + '/decks/' + id, httpOptions);
  }
}
