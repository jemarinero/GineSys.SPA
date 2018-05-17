import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { PacientesService } from '../../../services/pacientes.service';
import { AlertifyService } from '../../../../shared/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ISubscription, Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import { TerminoUltimoEmbarazo, EstadoCivil, CantidadMenstruacion } from '../../../models/constantes';

@Component({
  selector: 'app-paciente-details',
  templateUrl: './paciente-details.component.html',
  styleUrls: ['./paciente-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PacienteDetailsComponent implements OnInit, OnDestroy {
  paciente: Paciente = <Paciente>{ };
  isNew: boolean = false;
  estadosCiviles = EstadoCivil;
  terminosUltEmbarazo = TerminoUltimoEmbarazo;
  cantMenstruacion = CantidadMenstruacion;
  siNo = SiNo;
  aseguradoras: Observable<Aseguradora[]>;
  ocupaciones: Observable<Ocupacion[]>;
  religiones: Observable<Religion[]>;
  gruposSanguineos: Observable<GrupoSanguineo[]>;
  subcription: Subscription;

  constructor(private pacService: PacientesService, 
    private alertify: AlertifyService, 
    private route: ActivatedRoute,
    private asegService: AseguradorasService,
    private ocupService: OcupacionesService,
    private religionService: ReligionesService,
    private gsService: GruposSanguineosService,
    private sanitizer: DomSanitizer,
    private router: Router) { 
    }

  async ngOnInit() {
    this.getAseguradoras();
    this.getOcupaciones();
    this.getReligiones();
    this.getGruposSanguineos();
    this.subcription = this.route.data.subscribe(data => {
      let dataPaciente = data['paciente'];
      if(dataPaciente)
       this.paciente = dataPaciente; 
        
      if(!dataPaciente) {
        this.isNew = true;
        this.initValues();
      }

    });
    this.updateEdad();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
    this.paciente = null;
    this.estadosCiviles = null;
    this.terminosUltEmbarazo = null;
    this.cantMenstruacion = null;
    this.siNo = null;
    this.aseguradoras = null;
    this.ocupaciones = null;
    this.religiones = null;
    this.gruposSanguineos = null;
  }

  initValues() {
    this.paciente.cantidadEmbarazos = 0;
    this.paciente.cantidadHijosVivos = 0;
    this.paciente.cantidadHijosMuertos = 0;
    this.paciente.cantidadCesareas = 0;
    this.paciente.cantidadPartosVaginales = 0;
    this.paciente.cantidadObitos = 0;
    this.paciente.cantidadEctopicos = 0;
    this.paciente.cantidadMolas = 0;
    this.paciente.cantidadAbortos = 0;
    this.paciente.hasSeguroMedico = false;
    this.paciente.isAlergica = false;
    this.paciente.hasCirugiaPrevia = false;
    this.paciente.isPlanificando = false;
    this.paciente.hasLegrados = false;
    this.paciente.terminoUltimoEmbarazo = 3;
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
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, '+this.paciente.foto);
  }

  savePaciente(paciente) {
    paciente.foto = this.paciente.foto;
    paciente.estado = true;
    this.isNew ? this.create(paciente) : this.update(paciente);
  }

  create(paciente: Paciente) {
    this.pacService
      .create(paciente)
      .subscribe(createdPaciente => {
        this.paciente = createdPaciente;
        this.router.navigate(['/pacientes/'+createdPaciente.id]);
        this.isNew = false;
        this.alertify.success('Registro: '+createdPaciente.id+': '+createdPaciente.nombre+'. Creado correctamente.');
      }, 
      error => {
        this.alertify.error('Ocurrió un error!');
      });
  }

  update(paciente: Paciente) {
    let subs = this.pacService
      .update(paciente.id,paciente)
      .subscribe(() => {
          this.router.navigate(['/pacientes/'+paciente.id]);
          this.alertify.success('Registro: '+paciente.id+': '+paciente.nombre+'. Actualizado correctamente.');
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );

      this.subcription.add(subs);
  }
}
