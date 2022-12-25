import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Deck } from 'src/app/models/deck.model';
import { CardService } from '../card.service'
import { DeckService } from '../deck.service';

@Injectable({
  providedIn: 'root'
})
export class DeckInfoService {
  public cardCount = new BehaviorSubject<number>(0);
  public deckStatus = new BehaviorSubject<number>(0);
  constructor(private cardService: CardService, private deckService: DeckService) { }

  getCardCount(deck: Deck): void {
    this.cardService.getAllCardsByDeckId(deck.id ? deck.id : -1).subscribe(response => {
      if (response.isSuccessful) {
        this.cardCount.next(response.data.count);
      } else {
        this.cardCount.next(0);
      }
    });
  }
  getDeckStatsById(id: number): void {
    this.deckService.getDeckStatsbyId(id).subscribe(response => {
      if (response.isSuccessful) {
        if (response.data === null) {
          this.deckStatus.next(0);
        }
        this.deckStatus.next(response.data.percentage);
      } else {
        this.deckStatus.next(0);
      }
    });
  }
}
