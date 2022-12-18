import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private localStore: LocalService) { }
  fullname: any;
  isLogin: boolean = false;
  ngOnInit(): void {
    if (this.localStore.getData("id")) {
      this.userService.getUserById(Number(this.localStore.getData("id"))).subscribe(response => {
        if (response.isSuccessful) {
          this.isLogin = true;
          this.fullname = response.data.fullName;
        }
      })
    } else {
      this.isLogin = false;
    }
  }
  public Logout() {
    this.localStore.clearData();
    this.router.navigate(['/login']);
  }
}
