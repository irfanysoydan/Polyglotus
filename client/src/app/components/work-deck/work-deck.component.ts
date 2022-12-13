import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Deck } from 'src/app/models/deck.model';

@Component({
  selector: 'app-work-deck',
  templateUrl: './work-deck.component.html',
  styleUrls: ['./work-deck.component.scss']
})
export class WorkDeckComponent {
  constructor() { }
  deckInfo: any;
  cards: Card[] = [
    {
      id: 1,
      deckId: 1,
      word: "Word 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dictum risus. Fusce ullamcorper, purus quis eleifend sagittis, felis lectus congue mi, non suscipit nisi est non erat. ",
      meaningId: 2,
      status: false
    },
    {
      id: 2,
      deckId: 1,
      word: "Answer 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dictum risus. Fusce ullamcorper, purus quis eleifend sagittis, felis lectus congue mi, non suscipit nisi est non erat. ",
      meaningId: 1,
      status: false
    }, {
      id: 3,
      deckId: 1,
      word: "Word 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dictum risus. Fusce ullamcorper, purus quis eleifend sagittis, felis lectus congue mi, non suscipit nisi est non erat. ",
      meaningId: 4,
      status: false
    },
    {
      id: 4,
      deckId: 1,
      word: "Answer 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non dictum risus. Fusce ullamcorper, purus quis eleifend sagittis, felis lectus congue mi, non suscipit nisi est non erat. ",
      meaningId: 3,
      status: false
    }
  ]
  cardId: number = 1;
  selectedCardFront: any = this.cards.find(a => a.id == this.cardId);
  selectedCardBack: any = this.cards.find(a => a.meaningId == this.cardId);
  showCard: boolean = true;
  ngOnInit(): void {
    this.deckInfo = history.state.deck;
  }

  nextCard(status: boolean) {
    this.cardId += 2;
    this.selectedCardFront = this.cards.find(a => a.id == this.cardId);
    this.selectedCardBack = this.cards.find(a => a.meaningId == this.cardId);
    this.showCard = true
    if (status) {
      this.selectedCardFront.status = true;
      this.selectedCardBack.status = true;
    } else {
      this.selectedCardFront.state = false;
      this.selectedCardBack.status = false;
    }
  }

}
