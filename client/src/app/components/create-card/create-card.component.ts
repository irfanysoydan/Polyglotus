import { Component } from '@angular/core';

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
  constructor() { }
}
