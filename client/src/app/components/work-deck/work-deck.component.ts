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
  currentCard: WorkCard = new WorkCard();
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
          let allcards: Card[] = [];
          allcards = response.data.cards;
          allcards = allcards.filter(card => !card.status);
          for (let i = 0; i < allcards.length; i += 2) {
            let frontCard: Card = allcards[i];
            let backCard: Card = allcards.filter(c => c.id == frontCard.meaningId)[0];
            let workCard: WorkCard = new WorkCard();
            workCard.front = frontCard;
            workCard.back = backCard;
            this.cards.push(workCard);
          }
          this.currentCard = this.getRandomCard();
        }
      });
    }
  }

  getRandomCard(): WorkCard {
    return this.cards[Math.floor(Math.random() * this.cards.length)];
  }

  nextCard(status: boolean) {
    
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
