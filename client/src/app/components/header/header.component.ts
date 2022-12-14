import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(  private authService: AuthService ) { }
  
  fullname: string = "Ömer Uzumaki";
  
  ngOnInit(): void {

    
  }

}
