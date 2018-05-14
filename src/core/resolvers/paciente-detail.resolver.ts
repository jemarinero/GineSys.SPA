import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Paciente } from "../models/paciente";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { PacientesService } from './../services/pacientes.service';
import { AlertifyService } from "../../shared/services/alertify.service";
import { Injectable } from "@angular/core";

@Injectable()
export class PacienteDetailResolver implements Resolve<Paciente> {

    constructor(private pacService: PacientesService, 
        private router: Router, 
        private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot) : Observable<Paciente> {
        return this.pacService.getOne(route.params['id']).catch(error => {
            this.alertify.error('Sucedio un error al obtener datos.');
            this.router.navigate(['/']);
            return Observable.of(null);
        });
    }
}