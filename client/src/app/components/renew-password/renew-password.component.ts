import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-renew-password',
  templateUrl: './renew-password.component.html',
  styleUrls: ['./renew-password.component.scss']
})
export class RenewPasswordComponent {
  paramsObject: any;
  token: string = "";
  isError: boolean = false;
  message: string = "";
  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  resetPass(pass: string, repass: string) {
    if (pass.trim() == "" || repass.trim() == "") {
      this.message = "Şifre boş olamaz"
      this.isError = true
    } else if (pass.length < 8 || repass.length < 8) {
      this.message = " Şifre uzunlukları en az 8 karakter olmalı"
      this.isError = true
    } else if (pass !== repass) {
      this.message = " Şifreler eşleşmiyor"
      this.isError = true
    }
    this.route.queryParamMap
      .subscribe((params) => {
        this.paramsObject = { ...params.keys, ...params };
        this.token = this.paramsObject.params.token;
        this.authService.resetPassword(pass, this.token).subscribe(response => {
          if (response.isSuccessful) {

          } else {
            this.message = " Şifre değiştirilemedi"
            this.isError = true;
          }
        });
      }
      );

  }
}
