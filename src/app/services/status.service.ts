import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import {Router} from '@angular/router';

@Injectable()
export class StatusService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getStatus() {

    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/logout']);
      return;
    }

    return this.httpClient.get(`${environment.url}/api/status/${localStorage.getItem('userName')}`);
  }

}
