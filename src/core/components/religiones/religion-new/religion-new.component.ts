import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-religion-new',
  templateUrl: './religion-new.component.html',
  styleUrls: ['./religion-new.component.css']
})
export class ReligionNewComponent implements OnInit {
  religion: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.religion = data;
   }
  ngOnInit() {
  }

}
