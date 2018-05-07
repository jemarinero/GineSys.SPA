import { Component, OnInit, Inject } from '@angular/core';
import { Aseguradora } from '../../../models/aseguradora';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aseguradora-edit',
  templateUrl: './aseguradora-edit.component.html',
  styleUrls: ['./aseguradora-edit.component.css']
})
export class AseguradoraEditComponent implements OnInit {
  aseguradora: Aseguradora;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.aseguradora = data;
   }
  ngOnInit() {
  }
}
