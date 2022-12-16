import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CreateCard } from 'src/app/models/create-card.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {
  showCard: boolean = true;
  word: any;
  description: any;
  answer: any;
  answerDescription: any;
  constructor(private cardService: CardService, private router: Router) { }



  addCard() {
    let card: Card = new Card();
    card.word = this.word;
    card.description = this.description;
    card.status = false;

    let answer: Card = new Card();
    answer.word = this.answer;
    answer.description = this.answerDescription;
    answer.status = false;

    let createCard: CreateCard = new CreateCard();
    createCard.front = card;
    createCard.back = answer;
    createCard.deckId = history.state.deck.id;
    this.cardService.createCard(createCard).subscribe(response => {
      if (response.isSuccessful) {
        this.router.navigate(['/'])
      }
    });
  }
}
