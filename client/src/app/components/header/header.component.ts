import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  fullname: string = "Ömer Özoğlu";
  isLogin: boolean = false;
  ngOnInit(): void {
  }

}
