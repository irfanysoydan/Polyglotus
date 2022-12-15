import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-passsword',
  templateUrl: './forgot-passsword.component.html',
  styleUrls: ['./forgot-passsword.component.scss']
})
export class ForgotPassswordComponent {
  constructor(private authService: AuthService) {
  }

  forgotPassword(email: string) {
    if (typeof email != 'undefined') {
      console.log(email);

      this.authService.forgotPassword(email).subscribe(result => {
        console.log(result);

        if (typeof result != 'undefined') {

        }
      })
    }
  }
}
