import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class NavService {
    public fechaTrabajo : Subject<Date> = new Subject();
    
}
