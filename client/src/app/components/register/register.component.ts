import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(fullname: string, email: string, pass: string) {

    if (typeof fullname != 'undefined' && typeof email != 'undefined' && typeof pass != 'undefined') {
      let user: User = new User();
      user.fullName = fullname;
      user.email = email;
      user.password = pass;
      this.authService.registerUser(user).subscribe(result => {
        if (typeof result != 'undefined') {
          this.router.navigate(['/login']);
        }
      });
    } else {

    }
  }

}
