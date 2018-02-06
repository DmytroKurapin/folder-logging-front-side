import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {MonitorComponent} from './monitor/monitor.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './services/auth.service';
import {DublicateLoginService} from './services/dublicate-login.service';
import {AuthGuardService} from './services/auth-guard.service';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import {MonitorService} from './services/monitor.service';
import {HttpClientModule} from '@angular/common/http';
import { StatusComponent } from './status/status.component';
import {StatusService} from "./services/status.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MonitorComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [AuthService, DublicateLoginService, AuthGuardService, MonitorService, StatusService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
