import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from 'src/app/models/deck.model';
import { DeckInfoService } from 'src/app/services/deck-info/deck-info.service';
import { DeckService } from 'src/app/services/deck.service';
import { DataService } from 'src/app/services/generic-data-service/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  decks: Deck[] = [];
  isError: boolean = false;
  message: string = "";
  constructor(private deckService: DeckService, private deckInfo: DeckInfoService, private loader: LoaderService, private router: Router, private dataService: DataService<Deck>) { }

  ngOnInit(): void {
    this.getDecks();

  }
  AddDeck(deckName: string) {
    if (deckName.trim() != '') {
      let deck: Deck = new Deck();
      deck.name = deckName;
      deck.cardCount = 0;
      deck.deckPercentage = 0;
      this.deckService.createDeck(deck).subscribe(response => {
        if (response.isSuccessful) {
          this.isError = false;
          this.decks.push(response.data);
          this.getDecks();
          Swal.fire(
            'Kayıt Başarılı',
            'Deste başarılı bir şekilde oluşturuldu!',
            'success'
          )
        } else {
          this.message = "Deste oluşturulamadı"
          this.isError = true;
          Swal.fire(
            'Hata',
            'Deste oluşturulurken hata oluştu!',
            'warning'
          )
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
          this.deckInfo.getCardCount(deck);
          this.deckInfo.cardCount.subscribe(x => deck.cardCount = x);
          this.deckInfo.getDeckStatsById(deck.id);
          this.deckInfo.deckStatus.subscribe(x => deck.deckPercentage = x);
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
  navigateDetails(deck: Deck) {
    // this.dataService.sendData(deck);
    this.router.navigate(['home/deck'], { state: { deck: deck } });
  }
}

