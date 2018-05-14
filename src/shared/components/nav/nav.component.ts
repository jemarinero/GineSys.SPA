import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from './../../services/alertify.service';
import { FechaTrabajoService } from './../../services/fecha-trabajo.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  systemDate: Date;
  enConsulta: string;
  siguiente: string;
  isCollapsed = false;
  
  constructor(private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private ftService: FechaTrabajoService) {
      this.ftService.fechaTrabajo.subscribe(fecha => {
        this.systemDate = fecha;
      });
      
   }

   ngOnInit() {
     this.enConsulta = 'nombre del paciente en consulta'
     this.siguiente = 'nombre del siguiente paciente'
     this.ftService.fechaTrabajo.next(new Date(2018,5,1));
   }

  getUser() {
    return this.authService.decodedToken.nombreUsuario;
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.alertify.message('Salio del Sistema');
  }

}
