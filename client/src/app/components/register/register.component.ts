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

  constructor(private authService: AuthService, private router: Router, private loader: LoaderService) { }

  ngOnInit(): void {
  }

  register(fullname: string, email: string, pass: string) {
    this.loader.setLoading(true);
    if (typeof fullname != 'undefined' && typeof email != 'undefined' && typeof pass != 'undefined') {
      let user: User = new User();
      user.fullName = fullname;
      user.email = email;
      user.password = pass;
      this.authService.registerUser(user).subscribe(result => {
        if (typeof result != 'undefined') {
          this.router.navigate(['/login']);
        }
        this.loader.setLoading(false);
      });
    } else {

    }
  }

}
