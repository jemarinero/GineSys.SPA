import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Religion } from '../../../models/religion';

@Component({
  selector: 'app-religion-edit',
  templateUrl: './religion-edit.component.html',
  styleUrls: ['./religion-edit.component.css']
})
export class ReligionEditComponent implements OnInit {
  religion: Religion;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.religion = data;
   }
  ngOnInit() {
  }
}
