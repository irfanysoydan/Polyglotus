import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Deck } from '../models/deck.model';
import { ResponseModel } from '../models/response.model';
import { LocalService } from './local.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  public decks: Deck[] | any;
  public deck: Deck | any;
  decksUrl = environment.apiUrl + 'decks/';

  constructor(private http: HttpClient, private localStore: LocalService) {
    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', "Bearer " + this.localStore.getData("token"));
  }

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

  getDeckStatsbyId(id: number) {
    return this.http.get<ResponseModel>(this.decksUrl + id + "/status", httpOptions);
  }

  createDeck(deck: Deck): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.decksUrl, deck, httpOptions);
  }

  deleteDeck(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(this.decksUrl + id, httpOptions);
  }
}
