import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-grupo-sanguineo-new',
  templateUrl: './grupo-sanguineo-new.component.html',
  styleUrls: ['./grupo-sanguineo-new.component.css']
})
export class GrupoSanguineoNewComponent {
  value: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.value = data;
   }

}
