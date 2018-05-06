import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Ocupacion } from '../models/ocupacion';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { DataService } from './../../shared/services/data.service';

@Injectable()
export class OcupacionesService extends DataService {
    
    constructor(http: HttpClient) {
        super(environment.apiUrl +'ocupaciones',http);
     }

}
