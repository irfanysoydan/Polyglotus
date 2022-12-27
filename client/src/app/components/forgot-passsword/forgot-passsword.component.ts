import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-passsword',
  templateUrl: './forgot-passsword.component.html',
  styleUrls: ['./forgot-passsword.component.scss']
})
export class ForgotPassswordComponent {
  isError: boolean = false;
  message: string = "";
  isSent: boolean = false;
  private emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  constructor(private authService: AuthService) {
  }

  forgotPassword(email: string) {
    if (typeof email != 'undefined' && email.trim() != "") {
      if (!this.emailRegex.test(email)) {
        this.message = "Email geçerli değil."
        this.isError = true;
      } else {
        this.authService.forgotPassword(email).subscribe(response => {
          if (response.isSuccessful) {
            this.isError = false;
            this.isSent = true;
            Swal.fire(
              'Gönderildi',
              'Email başarılı bir şekilde gönderildi!',
              'success'
            )
          } else {
            Swal.fire(
              'Hata',
              'Email gönderilirken hata oluştu!',
              'error'
            )
            this.message = "Email gönderilemedi."
            this.isError = true;
            this.isSent = false;
          }
        })
      }
    } else {
      this.message = "Email boş olamaz"
      this.isError = true;
      this.isSent = false;
    }
  }
}
