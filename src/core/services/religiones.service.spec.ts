/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReligionesService } from './religiones.service';

describe('Service: Religiones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReligionesService]
    });
  });

  it('should ...', inject([ReligionesService], (service: ReligionesService) => {
    expect(service).toBeTruthy();
  }));
});
