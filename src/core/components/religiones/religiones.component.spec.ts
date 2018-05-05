/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReligionesComponent } from './religiones.component';

describe('ReligionesComponent', () => {
  let component: ReligionesComponent;
  let fixture: ComponentFixture<ReligionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
