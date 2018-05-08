import { Component, OnInit, Inject } from '@angular/core';
import { Aseguradora } from '../../../models/aseguradora';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aseguradora-new',
  templateUrl: './aseguradora-new.component.html',
  styleUrls: ['./aseguradora-new.component.css']
})
export class AseguradoraNewComponent implements OnInit {
  aseguradora: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.aseguradora = data;
   }
  ngOnInit() {
  }

}
