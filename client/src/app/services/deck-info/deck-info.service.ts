import { Injectable } from '@angular/core';
import { Deck } from 'src/app/models/deck.model';
import { CardService } from '../card.service'

@Injectable({
  providedIn: 'root'
})
export class DeckInfoService {
  cardCount: number = 0;
  constructor(private cardService: CardService) { }

  getCardCount(deck: Deck) {
    this.cardService.getAllCardsByDeckId(deck.id ? deck.id : -1).subscribe(response => {
      if (response.isSuccessful) {
        this.cardCount = response.data.length ? response.data.length / 2 : 0;
      } else {
        this.cardCount = 0;
      }
    });
  }
}
