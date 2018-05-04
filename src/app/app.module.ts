import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HomeComponent } from '../shared/components/home/home.component';
import { LoginComponent } from '../shared/components/login/login.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { AppComponent } from './app.component';
import { NavComponent } from '../shared/components/nav/nav.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
