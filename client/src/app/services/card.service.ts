import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { CreateCard } from '../models/create-card.model';
import { ResponseModel } from '../models/response.model';
import { LocalService } from './local.service';
import { Card } from '../models/card.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})

export class CardService {

  cardsUrl = environment.apiUrl + "cards/";
  constructor(private http: HttpClient, private localStore: LocalService) {
    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', "Bearer " + this.localStore.getData("token"));
  }

  getAllCardsByDeckId(id: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.cardsUrl + id, httpOptions);
  }

  // getCardById(id: number): Observable<ResponseModel> {
  //   return this.http.get<ResponseModel>(this.cardsUrl + id, httpOptions);
  // }

  createCard(card: CreateCard): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.cardsUrl, card, httpOptions);
  }

  updateCardStatus(id: number, card: Card): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(this.cardsUrl + id + "/status", card, httpOptions);
  }

  deleteCard(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(this.cardsUrl + id, httpOptions);
  }
}
