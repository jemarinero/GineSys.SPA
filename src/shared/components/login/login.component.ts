import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from './../../services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,
    private alertify: AlertifyService, 
    private router: Router) {
   }

   ngOnInit() {
     if(this.authService.loggedIn()) {
       this.router.navigate(['/']);
     }
   }

  login() {
    this.authService.login(this.model)
      .subscribe(data => {
        this.router.navigate([this.authService.getActiveUrl()]);
        this.alertify.success('Bienvenido '+ this.authService.decodedToken.nombreUsuario);
      },
      error => {
        this.alertify.error('Permiso Denegado!');
      });
  }
}
