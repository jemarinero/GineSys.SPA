/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AseguradorasService } from './aseguradoras.service';

describe('Service: Aseguradoras', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AseguradorasService]
    });
  });

  it('should ...', inject([AseguradorasService], (service: AseguradorasService) => {
    expect(service).toBeTruthy();
  }));
});
