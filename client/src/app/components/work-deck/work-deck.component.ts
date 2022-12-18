import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Deck } from 'src/app/models/deck.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-work-deck',
  templateUrl: './work-deck.component.html',
  styleUrls: ['./work-deck.component.scss']
})
export class WorkDeckComponent {
  constructor(private cardService: CardService) { }
  deckInfo: Deck = new Deck();
  cards: Card[] = [];
  cardId: number = 0;
  selectedCardFront: Card = new Card();
  selectedCardBack: Card = new Card();
  showCard: boolean = true;
  isEndOfTheDeck: boolean = false;
  ngOnInit(): void {
    this.deckInfo = history.state.deck;
    this.getCardsByDeckId();

  }
  getCardsByDeckId() {
    if (this.deckInfo) {
      this.cardService.getAllCardsByDeckId(this.deckInfo.id ? this.deckInfo.id : -1).subscribe(response => {
        if (response.isSuccessful) {
          this.cards = response.data;
          this.selectedCardFront = this.cards[0];
          this.selectedCardBack = this.cards[1];
        }
      });
    }
  }

  nextCard(status: boolean) {
    if (this.cardId < this.cards.length - 2) {
      this.cardId += 2;
      this.selectedCardFront = this.cards[this.cardId];
      this.selectedCardBack = this.cards[++this.cardId];

      this.showCard = true
      if (status) {
        this.selectedCardFront.status = true;
        this.selectedCardBack.status = true;
      } else {
        this.selectedCardFront.status = false;
        this.selectedCardBack.status = false;
      }
    } else {
      this.isEndOfTheDeck = true;
      this.showCard = false;
    }
  }
}
