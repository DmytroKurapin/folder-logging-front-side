import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class DublicateLoginService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.routeConfig.path === 'logout') {
      this.authService.logout();
      return true;
    }

    if (localStorage.getItem('isSignedIn') && localStorage.getItem('isSignedIn') === 'true') {
      this.router.navigate(['/monitor']);
      return false;
    }
    return true;
  }
}
