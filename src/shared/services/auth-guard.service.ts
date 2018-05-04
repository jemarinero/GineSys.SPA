import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private auth: AuthService,
      private router: Router
    ) { }
  
    canActivate(route, state: RouterStateSnapshot) {
        const loggedIn = this.auth.loggedIn();
  
        if(loggedIn) return true;

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
  }
  