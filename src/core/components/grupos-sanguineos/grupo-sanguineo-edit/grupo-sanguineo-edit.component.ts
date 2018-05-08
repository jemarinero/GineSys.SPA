import { Component, OnInit, Inject } from '@angular/core';
import { GrupoSanguineo } from '../../../models/grupo-sanguineo';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-grupo-sanguineo-edit',
  templateUrl: './grupo-sanguineo-edit.component.html',
  styleUrls: ['./grupo-sanguineo-edit.component.css']
})
export class GrupoSanguineoEditComponent {
  dataObj: GrupoSanguineo;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.dataObj = data;
   }


}
