import { Component, OnInit } from '@angular/core';
import { Deck } from 'src/app/models/deck.model';
import { DeckService } from 'src/app/services/deck.service';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private deckService: DeckService, private loader: LoaderService) { }
  decks: any[] = [];
  isException: boolean = false;
  ngOnInit(): void {
    this.getDecks();
  }
  AddDeck(deckName: string) {
    if (deckName != "") {
      let deck: Deck = new Deck();
      deck.name = deckName;
      this.deckService.createDeck(deck).subscribe(response => {
        if (response.isSuccessful) {
          this.decks.push(response.data);
        } else {
          this.isException = true;
        }

      });
      this.isException = false;
    } else {
      this.isException = true
    }

  }
  getDecks() {
    this.loader.setLoading(true);
    this.deckService.getDecks().subscribe(response => {
      if (response.isSuccessful) {
        this.decks = response.data;
      } else {
        this.decks = [];
      }
      this.loader.setLoading(false);
    });

  }
  deleteDeck(deckId: number) {
    if (deckId != null) {
      this.deckService.deleteDeck(deckId).subscribe(response => {
        if (response.isSuccessful) {
          this.decks = this.decks.filter((deck => deck.id != deckId));
        } else {
          this.isException = true;
        }
      });
      this.isException = false;
    } else {
      this.isException = true;
    }

  }
}
