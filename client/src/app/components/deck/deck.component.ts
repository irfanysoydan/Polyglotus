import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { Deck } from 'src/app/models/deck.model';
import { CardService } from 'src/app/services/card.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  deckInfo: Deck = new Deck();
  cards: Card[] = [];
  isError: boolean = false;
  message: string = "";
  constructor(private cardService: CardService, private router: Router) { }

  ngOnInit(): void {
    this.deckInfo = history.state.deck;
    this.getCardsByDeckId();
  }

  getCardsByDeckId() {
    if (this.deckInfo) {
      this.cardService.getAllCardsByDeckId(this.deckInfo.id ? this.deckInfo.id : -1).subscribe(response => {
        if (response.isSuccessful) {
          this.cards = response.data.cards;
          this.cards = this.cards.filter(p => p.id != (p.meaningId ? p.meaningId + 1 : p.meaningId));
        }
      });
    } else {
      this.router.navigate(['/home']);
    }

  }

  deleteCard(cardId: number) {
    this.cardService.deleteCard(cardId).subscribe(response => {
      if (response.isSuccessful) {
        this.isError = false;
        this.cards = this.cards.filter((card => card.id != cardId));
      } else {
        this.message = "Kart silinemedi."
        this.isError = true;
      }
    });
  }
}
