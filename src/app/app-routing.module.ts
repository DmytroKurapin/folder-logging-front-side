import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DublicateLoginService} from './services/dublicate-login.service';
import {MonitorComponent} from './monitor/monitor.component';
import {AuthGuardService} from './services/auth-guard.service';
import {StatusComponent} from './status/status.component';

const routes: Routes = [
  {
    path: 'monitor',
    component: MonitorComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'status',
    component: StatusComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent, canActivate: [DublicateLoginService]
  },
  {
    path: 'logout',
    component: LoginComponent, canActivate: [DublicateLoginService]
  },
  {
    path: '**',
    redirectTo: 'monitor'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
