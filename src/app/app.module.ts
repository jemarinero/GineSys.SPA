import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatExpansionModule, MatIconModule, MatListModule, MatSidenavModule, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTooltipModule, MatDialogModule, MatPaginatorIntl } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { UsuariosComponent } from '../admin/components/usuarios/usuarios.component';
import { AseguradorasComponent } from '../core/components/aseguradoras/aseguradoras.component';
import { OcupacionesComponent } from '../core/components/ocupaciones/ocupaciones.component';
import { ReligionesComponent } from '../core/components/religiones/religiones.component';
import { OcupacionesService } from '../core/services/ocupaciones.service';
import { AuthModule } from '../shared/auth.module';
import { HomeComponent } from '../shared/components/home/home.component';
import { LoginComponent } from '../shared/components/login/login.component';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { NavComponent } from '../shared/components/nav/nav.component';
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';
import { AlertifyService } from '../shared/services/alertify.service';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { MatPaginatorIntlCro } from '../shared/models/MatPaginatorIntlCro';
import { OcupacionEditComponent } from '../core/components/ocupaciones/ocupacion-edit/ocupacion-edit.component';
import { OcupacionNewComponent } from '../core/components/ocupaciones/ocupacion-new/ocupacion-new.component';
import { DeleteDialogComponent } from '../shared/components/delete-dialog/delete-dialog.component';
import { DashboardComponent } from '../shared/components/dashboard/dashboard.component';
import { ReligionEditComponent } from '../core/components/religiones/religion-edit/religion-edit.component';
import { ReligionNewComponent } from '../core/components/religiones/religion-new/religion-new.component';
import { ReligionesService } from '../core/services/religiones.service';


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
    AseguradorasComponent,
    OcupacionEditComponent,
    OcupacionNewComponent,
    DeleteDialogComponent,
    DashboardComponent,
    ReligionEditComponent,
    ReligionNewComponent
  ],
  entryComponents: [
    OcupacionEditComponent,
    OcupacionNewComponent,
    DeleteDialogComponent,
    ReligionEditComponent,
    ReligionNewComponent
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
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    HttpClientModule,
    AuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertifyService,
    OcupacionesService,
    ReligionesService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
