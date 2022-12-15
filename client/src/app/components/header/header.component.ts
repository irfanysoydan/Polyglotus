import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }
  fullname: any;
  isLogin: boolean = false;
  ngOnInit(): void {
    if (localStorage.getItem("id")) {
      this.userService.getUserById(Number(localStorage.getItem("id"))).subscribe(user => {
        this.isLogin = true;
        this.fullname = user.fullName;
        this.ngOnInit();
      })

    } else {
      this.isLogin = false;
    }
  }
  public Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
