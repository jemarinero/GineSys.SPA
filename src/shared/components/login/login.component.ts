import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,
    private toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
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
        this.toastr.success('logged in successfully');
      },
      error => {
        this.toastr.error(error);
      });
  }
}
