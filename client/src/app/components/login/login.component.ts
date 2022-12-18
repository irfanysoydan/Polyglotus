import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private loader: LoaderService, private localStore: LocalService) { }
  ngOnInit(): void {

  }
  login(email: string, pass: string) {
    this.loader.setLoading(true);
    let user: User = new User();
    if (typeof email != 'undefined' && typeof pass != 'undefined') {
      user.email = email;
      user.password = pass;
      this.authService.loginUser(user).subscribe(loginUser => {
        if (loginUser.token == null) {
          //Toats warning
        } else {
          this.localStore.saveData("id", loginUser.id.toString());
          this.localStore.saveData("isAdmin", loginUser.isAdmin == true ? "1" : "0");
          this.localStore.saveData("token", loginUser.token);
          this.router.navigate(['/']);
        }
        this.loader.setLoading(false);
      });
    }
    else {
      //Toast warrning
    }
  }
}
