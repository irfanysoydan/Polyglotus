import { Injectable } from '@angular/core';
import { LoginState } from '../models/login-state.model';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  constructor() { }
  state?: LoginState;

  setLoginState(loginState: LoginState) {
    this.state = loginState;
    localStorage.setItem("id", loginState.id);
    localStorage.setItem("token", loginState.token);
    localStorage.setItem("isAdmin", loginState.isAdmin);
  }
  getLoginState() {
    return this.state;
  }
}
