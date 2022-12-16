import { Component, OnInit } from '@angular/core';
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

  constructor(private cardService: CardService, private loader: LoaderService) { }

  deckInfo: Deck = new Deck();
  cards: Card[] = [];
  ngOnInit(): void {
    this.deckInfo = history.state.deck;
    console.log(this.deckInfo);
    this.getCardsByDeckId();
  }

  getCardsByDeckId() {
    this.loader.setLoading(true);
    if (this.deckInfo) {
      console.log(this.deckInfo);
      this.cardService.getAllCardsByDeckId(this.deckInfo.id ? this.deckInfo.id : -1).subscribe(response => {
        console.log(response);

        if (response.isSuccessful) {
          this.cards = response.data;
          this.cards = this.cards.filter(p => p.id != (p.meaningId ? p.meaningId + 1 : p.meaningId));

        }
        this.loader.setLoading(false);
      });
    }

  }

  deleteCard(cardId: number) {
    this.cardService.deleteCard(cardId).subscribe(response => {
      if (response.isSuccessful) {
        this.cards = this.cards.filter((card => card.id != cardId));
      }
    });
  }
}
