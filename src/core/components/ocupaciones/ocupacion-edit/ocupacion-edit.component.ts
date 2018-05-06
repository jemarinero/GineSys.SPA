import { Component, OnInit, Inject } from '@angular/core';
import { Ocupacion } from '../../../models/ocupacion';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ocupacion-edit',
  templateUrl: './ocupacion-edit.component.html',
  styleUrls: ['./ocupacion-edit.component.css']
})
export class OcupacionEditComponent implements OnInit {
  ocupacion: Ocupacion;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.ocupacion = data;
   }
  ngOnInit() {
  }

}
