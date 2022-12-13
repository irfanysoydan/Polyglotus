import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  username: String | undefined;
  
  constructor(
  private authService: AuthService

  ) {}

  
  ngOnInit(): void {

    this.username = this.authService.username;
  }

}