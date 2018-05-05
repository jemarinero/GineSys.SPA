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
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { HomeComponent } from '../shared/components/home/home.component';
import { LoginComponent } from '../shared/components/login/login.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { AppComponent } from './app.component';
import { NavComponent } from '../shared/components/nav/nav.component';
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatExpansionModule, MatListModule } from '@angular/material';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { UsuariosComponent } from '../admin/components/usuarios/usuarios.component';
import { OcupacionesComponent } from '../core/components/ocupaciones/ocupaciones.component';
import { appRoutes } from './routes';
import { ReligionesComponent } from '../core/components/religiones/religiones.component';
import { AseguradorasComponent } from '../core/components/aseguradoras/aseguradoras.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    SidenavComponent,
    MenuComponent,
    UsuariosComponent,
    OcupacionesComponent,
    ReligionesComponent,
    AseguradorasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ToastModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
