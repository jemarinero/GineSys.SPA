import { Injectable } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GruposSanguineosService extends DataService {
    
    constructor(http: HttpClient) {
        super(environment.apiUrl +'grupossanguineos',http);
     }

}
