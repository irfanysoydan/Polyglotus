import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isError: boolean = false;
  message: string = "";
  private emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(fullname: string, email: string, pass: string) {
    if (typeof fullname != 'undefined' && typeof email != 'undefined' && typeof pass != 'undefined') {
      if (fullname.trim() == '') {
        this.message = "Ad soyad boş olamaz."
        this.isError = true;
      }
      else if (email.trim() == '') {
        this.message = "Email boş olamaz."
        this.isError = true;
      }
      else if (!this.emailRegex.test(email)) {
        this.message = "Email geçerli değil."
        this.isError = true;
      }
      else if (pass.trim() == '') {
        this.message = "Şifre boş olamaz."
        this.isError = true;
      }
      else if (pass.length < 8) {
        this.message = "Şifre en az 8 karakter olmalıdır."
        this.isError = true;
      }
      else {
        let user: User = new User();
        user.fullName = fullname;
        user.email = email;
        user.password = pass;
        this.authService.registerUser(user).subscribe(result => {
          if (typeof result != 'undefined') {
            this.router.navigate(['/login']);
          }
        });
      }
    }
  }

}
