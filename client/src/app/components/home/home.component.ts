import { Component, OnInit } from '@angular/core';
import { Deck } from 'src/app/models/deck.model';
import { DeckInfoService } from 'src/app/services/deck-info/deck-info.service';
import { DeckService } from 'src/app/services/deck.service';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  decks: Deck[] = [];
  isError: boolean = false;
  message: string = "";
  constructor(private deckService: DeckService, private deckInfo: DeckInfoService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.getDecks();

  }
  AddDeck(deckName: string) {
    if (deckName.trim() != '') {
      let deck: Deck = new Deck();
      deck.name = deckName;
      this.deckService.createDeck(deck).subscribe(response => {
        if (response.isSuccessful) {
          this.isError = false;
          this.decks.push(response.data);
        } else {
          this.message = "Deste oluşturulamadı"
          this.isError = true;
        }
      });
    } else {
      this.message = "Deste adı boş olamaz."
      this.isError = true;
    }

  }
  getDecks() {
    this.loader.setLoading(true);
    this.deckService.getDecks().subscribe(response => {
      if (response.isSuccessful) {
        this.decks = response.data;
        this.decks.forEach(deck => {
          this.deckInfo.getCardCount(deck)
          deck.cardCount = this.deckInfo.cardCount;
        })
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
          this.isError = false;
          this.decks = this.decks.filter((deck => deck.id != deckId));
        } else {
          this.message = "Deste silinemedi."
          this.isError = true;
        }
      });
    } else {
      this.message = "Deste silinemedi."
      this.isError = true;
    }
  }
}
