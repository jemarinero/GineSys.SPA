/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OcupacionesService } from './ocupaciones.service';

describe('Service: Ocupaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OcupacionesService]
    });
  });

  it('should ...', inject([OcupacionesService], (service: OcupacionesService) => {
    expect(service).toBeTruthy();
  }));
});
