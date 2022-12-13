import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor() { }
  deckInfo: any;
  ngOnInit(): void {
    this.deckInfo = history.state.deck;
  }

}
