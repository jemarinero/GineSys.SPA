import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../../services/pacientes.service';
import { AlertifyService } from '../../../../shared/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../models/paciente';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { EstadoCivil } from './../../../models/estado-civil';
import { SiNo } from '../../../models/si-no';
import { Aseguradora } from '../../../models/aseguradora';
import { AseguradorasService } from '../../../services/aseguradoras.service';
import { OcupacionesService } from './../../../services/ocupaciones.service';
import { Ocupacion } from '../../../models/ocupacion';
import { Religion } from './../../../models/religion';
import { GrupoSanguineo } from '../../../models/grupo-sanguineo';
import { ReligionesService } from '../../../services/religiones.service';
import { GruposSanguineosService } from '../../../services/grupos-sanguineos.service';
import { FechaTrabajoService } from './../../../../shared/services/fecha-trabajo.service';

@Component({
  selector: 'app-paciente-details',
  templateUrl: './paciente-details.component.html',
  styleUrls: ['./paciente-details.component.css']
})
export class PacienteDetailsComponent implements OnInit {
  paciente: Paciente;
  isNew: boolean = false;
  estadoCivil = EstadoCivil;
  siNo = SiNo;
  aseguradoras: Aseguradora[];
  ocupaciones: Ocupacion[];
  religiones: Religion[];
  gruposSanguineos: GrupoSanguineo[];

  constructor(private pacService: PacientesService, 
    private alertify: AlertifyService, 
    private route: ActivatedRoute,
    private asegService: AseguradorasService,
    private ocupService: OcupacionesService,
    private religionService: ReligionesService,
    private gsService: GruposSanguineosService,
    private ftService: FechaTrabajoService) { 
    }

  async ngOnInit() {
    this.getAseguradoras();
    this.getOcupaciones();
    this.getReligiones();
    this.getGruposSanguineos();
    this.route.data.subscribe(data => {
      this.paciente = data['paciente'];
        
      if(!this.paciente)
        this.isNew = true;

    });
    this.updateEdad();
  }
  dateChanged(event: MatDatepickerInputEvent<Date>) {
    this.updateEdad();
    this.ftService.fechaTrabajo.next(this.paciente.fechaNacimiento);
  }

  
  updateEdad() {
    let now = moment(); // add this 2 of 4
    let fechaPaciente = moment(this.paciente.fechaNacimiento);

    let years = now.diff(fechaPaciente, 'years');
    fechaPaciente.add(years,'years');
    this.paciente.edad = years;

    var months = now.diff(fechaPaciente, 'months');
    fechaPaciente.add(months, 'months');
    this.paciente.meses = months;

    var days = now.diff(fechaPaciente, 'days');
    this.paciente.dias = days;
  }

  getAseguradoras() {
    this.asegService.getAll().subscribe((data: Aseguradora[]) => {
      this.aseguradoras = data;
    }, error => {
      this.alertify.error('Ocurrio un error al obtener aseguradoras.');
    });
  }

  getOcupaciones() {
    this.ocupService.getAll().subscribe((data: Ocupacion[]) => {
      this.ocupaciones = data;
    }, error => {
      this.alertify.error('Ocurrio un error al obtener ocupaciones.');
    });
  }

  getReligiones() {
    this.religionService.getAll().subscribe((data: Religion[]) => {
      this.religiones = data;
    }, error => {
      this.alertify.error('Ocurrio un error al obtener religiones.');
    });
  }

  getGruposSanguineos() {
    this.gsService.getAll().subscribe((data: GrupoSanguineo[]) => {
      this.gruposSanguineos = data;
    }, error => {
      this.alertify.error('Ocurrio un error al obtener grupos sanguineos.');
    });
  }
}
