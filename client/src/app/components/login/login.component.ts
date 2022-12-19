import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isError: boolean = false;
  message: string = "";
  constructor(private authService: AuthService, private router: Router, private localStore: LocalService) { }
  ngOnInit(): void {

  }
  login(email: string, pass: string) {
    let user: User = new User();
    if ((typeof email != 'undefined' && typeof pass != 'undefined') && (email.trim() != '' && pass.trim() != '')) {
      user.email = email;
      user.password = pass;
      this.authService.loginUser(user).subscribe(loginUser => {
        if (loginUser.token == null || loginUser.token.trim() == '') {
          this.message = "Email veya şifre hatalı !"
          this.isError = true;
        } else {
          this.isError = false;
          this.localStore.saveData("id", loginUser.id.toString());
          this.localStore.saveData("isAdmin", loginUser.isAdmin == true ? "1" : "0");
          this.localStore.saveData("token", loginUser.token);
          this.localStore.saveData("isLoggedIn", "1");
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }
      });
    }
    else {
      this.message = "Email veya şifre boş olamaz";
      this.isError = true;
    }
  }

}
