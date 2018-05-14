import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class FechaTrabajoService {
    public fechaTrabajo : Subject<Date> = new Subject();
    
}
