import { Component, OnInit } from '@angular/core';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class MenuComponent implements OnInit {
  expandableMenu: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.initMenu();  
  }

  initMenu() {
    this.expandableMenu = [
      { 
        title: 'Config. General',
        subMenus: [
          {
            title: 'Ocupaciones',
            route: '/ocupaciones',
            icon: 'work'
          },
          {
            title: 'Religiones',
            route: '/religiones',
            icon: 'account_balance'
          },
          {
            title: 'Aseguradoras',
            route: '/aseguradoras',
            icon: 'security'
          }
        ]
      },
      { 
        title: 'Administacion',
        subMenus: [
          {
            title: 'Usuarios',
            route: '/usuarios',
            icon: 'people'
          }
        ]
      }
    ];
  }

}
