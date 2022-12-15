import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-renew-password',
  templateUrl: './renew-password.component.html',
  styleUrls: ['./renew-password.component.scss']
})
export class RenewPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute) {

  }
  paramsObject: any;
  token: string = "";
  ngOnInit(): void {

  }
  resetPass(pass: string, repass: string) {
    this.route.queryParamMap
      .subscribe((params) => {
        this.paramsObject = { ...params.keys, ...params };
        this.token = this.paramsObject.params.token;
        this.authService.resetPassword(pass, this.token).subscribe(result => {
          console.log(result);

        });
      }
      );

  }
}
