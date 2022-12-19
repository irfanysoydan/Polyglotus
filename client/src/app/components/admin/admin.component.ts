import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
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
  constructor(private userService: UserService, private loader: LoaderService, private localStore: LocalService) { }

  ngOnInit(): void {
    // this.getUsers();
  }
  getUserList() {
    this.showUsers = true;
    this.getUsers();
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
