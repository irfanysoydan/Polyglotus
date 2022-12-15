import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {

  }
  login(email: string, pass: string) {
    let user: User = new User();
    if (typeof email != 'undefined' && typeof pass != 'undefined') {
      user.email = email;
      user.password = pass;
      this.authService.loginUser(user).subscribe(p => {
        if (p.token == null) {
          //Toats warning
        } else {
          localStorage.setItem("id", p.id.toString());
          localStorage.setItem("isAdmin", p.isAdmin == true ? "1" : "0");
          localStorage.setItem("token", p.token);
          this.router.navigate(['/']);
        }
      });
    }
    else {
      //Toast warrning
    }
  }
}
