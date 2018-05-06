import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from './../../services/alertify.service';

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
    private alertify: AlertifyService) {
    
   }

   ngOnInit() {
     this.systemDate = new Date();
     this.enConsulta = 'nombre del paciente en consulta'
     this.siguiente = 'nombre del siguiente paciente'
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
