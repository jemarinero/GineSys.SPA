import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { PacientesService } from '../../../services/pacientes.service';
import { AlertifyService } from '../../../../shared/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../models/paciente';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { SiNo } from '../../../models/si-no';
import { Aseguradora } from '../../../models/aseguradora';
import { AseguradorasService } from '../../../services/aseguradoras.service';
import { OcupacionesService } from './../../../services/ocupaciones.service';
import { Ocupacion } from '../../../models/ocupacion';
import { Religion } from './../../../models/religion';
import { GrupoSanguineo } from '../../../models/grupo-sanguineo';
import { ReligionesService } from '../../../services/religiones.service';
import { GruposSanguineosService } from '../../../services/grupos-sanguineos.service';
import { ISubscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import { TerminoUltimoEmbarazo, EstadoCivil } from '../../../models/constantes';

@Component({
  selector: 'app-paciente-details',
  templateUrl: './paciente-details.component.html',
  styleUrls: ['./paciente-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PacienteDetailsComponent implements OnInit, OnDestroy {
  paciente: Paciente;
  isNew: boolean = false;
  estadosCiviles = EstadoCivil;
  terminosUltEmbarazo = TerminoUltimoEmbarazo;
  siNo = SiNo;
  aseguradoras: Observable<Aseguradora[]>;
  ocupaciones: Observable<Ocupacion[]>;
  religiones: Observable<Religion[]>;
  gruposSanguineos: Observable<GrupoSanguineo[]>;
  subcription: ISubscription;

  constructor(private pacService: PacientesService, 
    private alertify: AlertifyService, 
    private route: ActivatedRoute,
    private asegService: AseguradorasService,
    private ocupService: OcupacionesService,
    private religionService: ReligionesService,
    private gsService: GruposSanguineosService,
    private sanitizer: DomSanitizer) { 
    }

  async ngOnInit() {
    this.getAseguradoras();
    this.getOcupaciones();
    this.getReligiones();
    this.getGruposSanguineos();
    this.subcription = this.route.data.subscribe(data => {
      this.paciente = data['paciente'];
      this.paciente.foto = 'data:image/png;base64, '+this.paciente.foto;
        
      if(!this.paciente)
        this.isNew = true;

    });
    this.updateEdad();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    this.updateEdad();
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
    this.aseguradoras = this.asegService.getAll();
  }

  getOcupaciones() {
    this.ocupaciones = this.ocupService.getAll();
  }

  getReligiones() {
    this.religiones = this.religionService.getAll()
  }

  getGruposSanguineos() {
    this.gruposSanguineos = this.gsService.getAll();
  }

  photoUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.paciente.foto);
  }
}
