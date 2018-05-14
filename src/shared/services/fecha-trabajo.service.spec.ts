/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FechaTrabajoService } from './fecha-trabajo.service';

describe('Service: FechaTrabajo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FechaTrabajoService]
    });
  });

  it('should ...', inject([FechaTrabajoService], (service: FechaTrabajoService) => {
    expect(service).toBeTruthy();
  }));
});
