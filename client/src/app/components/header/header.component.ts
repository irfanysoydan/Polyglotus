import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, withInMemoryScrolling } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fullname: string = "";
  isLogin: boolean = false;
  constructor(private authService: AuthService, private userService: UserService, private router: Router, private localStore: LocalService) { }

  ngOnInit(): void {
    this.isLogin = this.localStore.getData("isLoggedIn") == "1" ? true : false;
    if (this.isLogin) {
      this.userService.getUserById(Number(this.localStore.getData("id"))).subscribe(response => {
        if (response.isSuccessful) {
          this.fullname = response.data.fullName;
        }
      })
    }
  }

  public Logout() {
    this.localStore.clearData();
    this.router.navigate(['/login']).then(() => { window.location.reload(); });
  }
}
