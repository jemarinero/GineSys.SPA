/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GruposSanguineosComponent } from './grupos-sanguineos.component';

describe('GruposSanguineosComponent', () => {
  let component: GruposSanguineosComponent;
  let fixture: ComponentFixture<GruposSanguineosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposSanguineosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposSanguineosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
