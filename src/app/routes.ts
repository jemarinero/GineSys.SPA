import { Routes } from '@angular/router'
import { HomeComponent } from '../shared/components/home/home.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { LoginComponent } from '../shared/components/login/login.component';
import { UsuariosComponent } from '../admin/components/usuarios/usuarios.component';
import { OcupacionesComponent } from '../core/components/ocupaciones/ocupaciones.component';
import { ReligionesComponent } from './../core/components/religiones/religiones.component';
import { AseguradorasComponent } from './../core/components/aseguradoras/aseguradoras.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '', 
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { 
                path: '', component: HomeComponent ,children: [
                    { path: 'usuarios', component: UsuariosComponent},
                    { path: 'ocupaciones', component: OcupacionesComponent},
                    { path: 'religiones', component: ReligionesComponent},
                    { path: 'aseguradoras', component: AseguradorasComponent},
                ]
            }
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
] 