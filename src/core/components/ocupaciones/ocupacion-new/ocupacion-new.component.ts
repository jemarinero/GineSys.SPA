import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ocupacion } from '../../../models/ocupacion';

@Component({
  selector: 'app-ocupacion-new',
  templateUrl: './ocupacion-new.component.html',
  styleUrls: ['./ocupacion-new.component.css']
})
export class OcupacionNewComponent implements OnInit {
  ocupacion: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.ocupacion = data;
   }
  ngOnInit() {
  }

}
