import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DeckService } from 'src/app/services/deck.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  isError: boolean = false;
  message: string = "";
  showUsers: boolean = false;
  constructor(private userService: UserService, private deckService: DeckService, private loader: LoaderService, private localStore: LocalService) { }

  ngOnInit(): void {
    // this.getUsers();
  }
  getUserList() {
    this.showUsers = true;
    this.getUsers();
  }

  getAlldecks() {
    this.deckService.getDecks().subscribe(resonse => {
      console.log(resonse.data);
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(response => {
      if (response.isSuccessful) {
        this.users = response.data;
        this.isError = false;
      } else {
        this.isError = true;
        this.message = "Kullanıcılar getirilemedi";
      }
    });
  }
  updateUser(userId: number) {
    if (userId != null) {
      if (Number(this.localStore.getData("id")) != userId) {
        var user: User = new User();
        this.userService.getUserById(userId).subscribe(response => {
          if (response.isSuccessful) {
            user = response.data;
            user.isAdmin = true;
            this.userService.updateUserById(userId, user).subscribe(response => {
              if (response.isSuccessful) {
                this.isError = false;
                this.users = this.users.filter((user => user.id != userId));
              } else {
                this.message = "Kullanıcı güncellenemedi."
                this.isError = true;
              }
            });
          }
        });

      } else {
        this.message = "Zaten adminsiniz."
        this.isError = true;
      }

    } else {
      this.message = "İşlem başarısız"
      this.isError = true;
    }
  }

  deleteUser(userId: number) {
    if (userId != null) {
      if (Number(this.localStore.getData("id")) != userId) {
        this.userService.deleteUser(userId).subscribe(response => {
          if (response.isSuccessful) {
            this.isError = false;
            this.users = this.users.filter((user => user.id != userId));
          } else {
            this.message = "Kullanıcı silinemedi."
            this.isError = true;
          }
        });
      } else {
        this.message = "Kendinizi silemezsiniz."
        this.isError = true;
      }

    } else {
      this.message = "Kullanıcı silinemedi."
      this.isError = true;
    }
  }
}
