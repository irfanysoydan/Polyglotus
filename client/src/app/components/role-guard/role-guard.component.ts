import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-role-guard',
  templateUrl: './role-guard.component.html',
  styleUrls: ['./role-guard.component.scss']
})
export class RoleGuardComponent implements CanActivate {
  constructor(public router: Router, private localStore: LocalService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      this.localStore.getData("isAdmin") != "1" ? true : false
    ) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
