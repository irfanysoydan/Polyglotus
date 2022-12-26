import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CreateCard } from 'src/app/models/create-card.model';
import { CardService } from 'src/app/services/card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  showCard: boolean = true;
  word: string = "";
  description: string = "";
  answer: string = "";
  answerDescription: string = "";
  isError: boolean = false;
  message: string = "";
  constructor(private cardService: CardService, private router: Router) { }

  ngOnInit(): void {
    if (!history.state.deck) {
      this.router.navigate(['/home/deck'], { state: [{ deck: history.state.deck }] })
    }
  }

  addCard() {
    if (this.word.trim() == "") {
      this.message = "Ön yüz kelimesi boş geçilemez."
      this.isError = true;
    } else if (this.description.trim() == "") {
      this.message = "Ön yüz açıklaması boş geçilemez."
      this.isError = true;
    } else if (this.answer.trim() == "") {
      this.message = "Arka yüz kelimesi boş geçilemez."
      this.isError = true;
    } else if (this.answerDescription.trim() == "") {
      this.message = "Arka yüz açıklaması boş geçilemez."
      this.isError = true;
    } else {
      this.isError = false;
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
          this.isError = false;
          Swal.fire(
            'Kayıt Başarılı',
            'Kart başarılı bir şekilde oluşturuldu!',
            'success'
          )
          this.router.navigate(['/home/deck'], { state: { deck: history.state.deck } })
        } else {
          this.message = "Kart oluşturulamadı."
          this.isError = true;
        }
      });
    }
  }
}
