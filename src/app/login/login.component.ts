import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CredentialsParams} from '../module-helpers/credential-params';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidCredentials: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  submitLogin(credentialsUser: CredentialsParams) {
    // todo show connection errors
    this.invalidCredentials = false;
    // if (this.authService.login(credentialsUser)) this.router.navigateByUrl(localStorage.getItem('returnUrl') || '/monitor');
    // else this.invalidCredentials = true;
    this.authService.login(credentialsUser).subscribe((result) => {
      console.log(result);
      if (!result.isAnonymous) {
        localStorage.setItem('isSignedIn','true');
        this.invalidCredentials = false;
        this.router.navigateByUrl(localStorage.getItem('returnUrl') || '/monitor');
      } //else if (result.hasOwnProperty('errorMsg'))  this.connectionError = true;
      else {
        localStorage.setItem('isSignedIn','false');
        this.invalidCredentials = true;
      }
    });
  }

}
