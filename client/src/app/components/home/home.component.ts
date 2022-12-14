import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  decks: any[] = [
    { deckId: 1, name: "Test Deck 1", cardCount: 12, complatePercentage: 50 },
    { deckId: 2, name: "Test Deck 2", cardCount: 25, complatePercentage: 30 },
    { deckId: 3, name: "Test Deck 3", cardCount: 32, complatePercentage: 80 },
    { deckId: 4, name: "Test Deck 4", cardCount: 6, complatePercentage: 20 },
    { deckId: 5, name: "Test Deck 5", cardCount: 8, complatePercentage: 75 }]
  ngOnInit(): void {
  }
  deckId: number = 6;
  AddDeck(deckName: string) {
    this.decks.push({
      deckId: this.deckId, name: deckName, cardCount: 0, complatePercentage: 0
    });
    this.deckId++;

  }
}
