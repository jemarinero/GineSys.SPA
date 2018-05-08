/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GruposSanguineosService } from './grupos-sanguineos.service';

describe('Service: GruposSanguineos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GruposSanguineosService]
    });
  });

  it('should ...', inject([GruposSanguineosService], (service: GruposSanguineosService) => {
    expect(service).toBeTruthy();
  }));
});
