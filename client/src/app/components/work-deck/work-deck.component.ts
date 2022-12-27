import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Card } from 'src/app/models/card.model';
import { Deck } from 'src/app/models/deck.model';
import { WorkCard } from 'src/app/models/work-card.model';
import { CardService } from 'src/app/services/card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-deck',
  templateUrl: './work-deck.component.html',
  styleUrls: ['./work-deck.component.scss']
})
export class WorkDeckComponent {
  constructor(private cardService: CardService, private router: Router) { }
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
    } else {
      this.router.navigate(['home']);
    }
  }

  getRandomCard(): WorkCard {
    this.cards = this.cards.filter(c => c.front.status == false);
    if (this.cards.length == 0) {
      this.isEndOfTheDeck = true;
      Swal.fire(
        'Tebrikler!',
        'Tüm desteyi öğrendiniz!',
        'success'
      ).then(() => {
        this.router.navigate(['/home']);
      });
    }
    return this.cards[Math.floor(Math.random() * this.cards.length)];
  }

  nextCard(status: boolean) {
    if (this.cards.length > 0) {
      this.currentCard.front.status = status;
      this.cardService.updateCardStatus(this.currentCard.front.id ? this.currentCard.front.id : -1, this.currentCard.front).subscribe(response => {
        if (response.isSuccessful) {
          this.showCard = true;
          this.currentCard = this.getRandomCard();
        }
      });
    } else {
      this.isEndOfTheDeck = true;

    }
  }
}
