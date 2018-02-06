import { Injectable } from '@angular/core';
import {CredentialsParams} from '../module-helpers/credential-params';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class AuthService {


  constructor(private route: ActivatedRoute, private http: HttpClient) { }



public login(credentials: CredentialsParams): Observable<any> {
  localStorage.setItem('userName',credentials.user);
  return this.http.post(`${environment.url}/api/login`, credentials
    // ,{headers: new HttpHeaders().set('Authorization', 'my-auth-token')}
  );
}

public logout() {
  localStorage.removeItem('isSignedIn');

  if(localStorage.getItem('userName')) {
    let subs: Subscription = this.http.post(`${environment.url}/api/logout`, {user:localStorage.getItem('userName')}).subscribe(resp => {
      localStorage.removeItem('userName');
      subs.unsubscribe();
    });
  }
}

  private setReturnUrl() {
    localStorage.setItem('returnUrl', this.route.snapshot.queryParamMap.get('returnUrl') || '/monitor');
  }
}
