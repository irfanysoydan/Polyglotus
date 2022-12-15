import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CreateCard } from 'src/app/models/create-card.model';
import { CardService } from 'src/app/services/card.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private cardservice: CardService) {}
  decks: any[] = [
    { deckId: 1, name: 'Test Deck 1', cardCount: 12, complatePercentage: 50 },
    { deckId: 2, name: 'Test Deck 2', cardCount: 25, complatePercentage: 30 },
    { deckId: 3, name: 'Test Deck 3', cardCount: 32, complatePercentage: 80 },
    { deckId: 4, name: 'Test Deck 4', cardCount: 6, complatePercentage: 20 },
    { deckId: 5, name: 'Test Deck 5', cardCount: 8, complatePercentage: 75 },
  ];

  ngOnInit(): void {
    var card: Card = new Card();
    card.word = 'Ön ';
    card.description = 'hsdjckxas';
    card.status = false;

    var card2: Card = new Card();
    card2.word = 'Arka';
    card2.description = '123123';
    card2.status = false;

    var createCard: CreateCard = new CreateCard();
    createCard.deckId = 21;
    createCard.front = card;
    createCard.back = card2;

    this.cardservice.deleteCard(21).subscribe((x) => console.log(x));

  }
  deckId: number = 6;
  AddDeck(deckName: string) {
    this.decks.push({
      deckId: this.deckId,
      name: deckName,
      cardCount: 0,
      complatePercentage: 0,
    });
    this.deckId++;
  }
}
