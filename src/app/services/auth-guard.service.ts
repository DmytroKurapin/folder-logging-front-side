import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   /* if (this.authService.signedUser && !this.authService.signedUser.isAnonymous && this.authService.isAccepted) {
      return true;
    }

    this.authService.logout();
    this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
    return false;*/
   return true;
  }

}
