import { Routes } from '@angular/router'
import { HomeComponent } from '../shared/components/home/home.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { LoginComponent } from '../shared/components/login/login.component';
import { UsuariosComponent } from '../admin/components/usuarios/usuarios.component';
import { OcupacionesComponent } from '../core/components/ocupaciones/ocupaciones.component';
import { ReligionesComponent } from './../core/components/religiones/religiones.component';
import { AseguradorasComponent } from './../core/components/aseguradoras/aseguradoras.component';
import { DashboardComponent } from '../shared/components/dashboard/dashboard.component';
import { GruposSanguineosComponent } from '../core/components/grupos-sanguineos/grupos-sanguineos.component';
import { PacientesComponent } from './../core/components/pacientes/pacientes.component';
import { PacienteDetailsComponent } from './../core/components/pacientes/paciente-details/paciente-details.component';
import { PacienteDetailResolver } from '../core/resolvers/paciente-detail.resolver';

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
                    { path: 'grpsanguineos', component: GruposSanguineosComponent},
                    { path: 'pacientes', component: PacientesComponent},
                    { path: 'pacientes/:id', component: PacienteDetailsComponent, resolve: {paciente: PacienteDetailResolver}},
                    { path: 'dashboard', component: DashboardComponent}
                ]
            }
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
] 