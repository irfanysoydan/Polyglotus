import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    this.loader.setLoading(true);
    if (deckName.trim() != '') {
      let deck: Deck = new Deck();
      deck.name = deckName;
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
            'error'
          )
        }
        this.loader.setLoading(false);
      });
    } else {
      this.loader.setLoading(false);
      Swal.fire(
        'Hata',
        'Deste adı boş olamaz!',
        'error'
      )
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
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu işlem geri alınamaz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sil",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        if (deckId != null) {
          this.deckService.deleteDeck(deckId).subscribe(response => {
            if (response.isSuccessful) {
              this.isError = false;
              this.decks = this.decks.filter((deck => deck.id != deckId));
            } else {
              Swal.fire(
                'Hata',
                'Deste silinemedi!',
                'error'
              )
              this.message = "Deste silinemedi."
              this.isError = true;
            }
          });
        } else {
          Swal.fire(
            'Hata',
            'Deste silinemedi!',
            'error'
          )
          this.message = "Deste silinemedi."
          this.isError = true;
        }
        Swal.fire(
          "Silindi!",
          "Deste silindi.",
          "success"
        )
        // result.dismiss can be "cancel", "overlay",
        // "close", and "timer"
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelled",
          "Deste Silinmedi :)",
          "error"
        )
      }
    });
  }
  navigateDetails(deck: Deck) {
    // this.dataService.sendData(deck);
    this.router.navigate(['home/deck'], { state: { deck: deck } });
  }
}

