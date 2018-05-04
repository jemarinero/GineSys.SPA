import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  opened: boolean = false;
  infoUsuario: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.infoUsuario = this.authService.decodedToken;
  }

  toggleDrawer() {
    this.opened != this.opened;
  }
}
