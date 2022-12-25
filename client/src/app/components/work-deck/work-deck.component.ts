import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Deck } from 'src/app/models/deck.model';
import { WorkCard } from 'src/app/models/work-card.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-work-deck',
  templateUrl: './work-deck.component.html',
  styleUrls: ['./work-deck.component.scss']
})
export class WorkDeckComponent {
  constructor(private cardService: CardService) { }
  deckInfo: Deck = new Deck();
  cards: WorkCard[] = [];
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
          for (let i = 0; i < response.data.cards.length; i += 2) {
            let workcard: WorkCard = new WorkCard();
            workcard.front = response.data.cards[i];
            workcard.back = response.data.cards[i + 1];

          }
          // this.cards = response.data.cards;
          // this.selectedCardFront = this.cards[0];
          // this.selectedCardBack = this.cards[1];
        }
      });
    }
  }

  getRandomCard(): WorkCard {
    return this.cards[Math.floor(Math.random() * this.cards.length)];
  }

  nextCard(status: boolean) {
    // let currentCard: Card = this.cards[Math.floor(Math.random() * this.cards.length)];
    //console.log(currentCard);

    // if (this.cardId < this.cards.length - 2) {
    //   this.cardId += 2;
    //   this.selectedCardFront = this.cards[this.cardId];
    //   this.selectedCardBack = this.cards[++this.cardId];
    //   this.showCard = true
    //   this.selectedCardFront.status = status;
    //   this.selectedCardBack.status = status;
    //   this.cardService.updateCard(this.cardId, this.selectedCardFront).subscribe(response => {
    //     console.log(response);

    //     if (response.isSuccessful) {

    //     }
    //   });
    // } else {
    //   this.isEndOfTheDeck = true;
    //   this.showCard = false;
    // }
  }
}
