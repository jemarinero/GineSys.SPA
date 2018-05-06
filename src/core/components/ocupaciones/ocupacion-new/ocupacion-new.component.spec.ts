/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OcupacionNewComponent } from './ocupacion-new.component';

describe('OcupacionNewComponent', () => {
  let component: OcupacionNewComponent;
  let fixture: ComponentFixture<OcupacionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcupacionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupacionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
