import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente-new',
  templateUrl: './paciente-new.component.html',
  styleUrls: ['./paciente-new.component.css']
})
export class PacienteNewComponent implements OnInit {
  nombre: string;
  constructor() { }

  ngOnInit() {
    this.nombre = "Nombre del Paciente";
  }

}
