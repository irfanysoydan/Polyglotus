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
  decksUrl = 'http://192.168.43.107:3000/decks/';

  constructor(private http: HttpClient) { }

  getDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(this.decksUrl, httpOptions);
  }

  getDeckId(id: number): Observable<Deck> {
    return this.http.get<Deck>(this.decksUrl + id, httpOptions);
  }
  createDeck(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(this.decksUrl, deck, httpOptions);
  }

  deleteDeck(id: number): Observable<Deck> {
    //const url = `${this.decksUrl}${id}`; // DELETE api/heroes/42
    return this.http.delete(this.decksUrl + id, httpOptions);

  }


}
