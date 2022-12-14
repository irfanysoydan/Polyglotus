import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Deck } from '../models/deck.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY3MTAyNDg5MiwiZXhwIjoxNjcxMDI1ODkyfQ.eKn4cqJCurLhD7eVr0A6WfcAaQIegudizMdkOZOFxLM"
  })
};

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  decksUrl = 'http://10.138.133.93:3000';

  constructor(private http: HttpClient) { }

  getDecks(): Observable<Deck[]> {
    return this.http
      .get<Deck[]>(this.decksUrl+"/decks",httpOptions)
  }
}
