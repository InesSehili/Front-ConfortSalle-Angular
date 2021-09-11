import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleAceesComponent } from './controle-acees.component';

describe('ControleAceesComponent', () => {
  let component: ControleAceesComponent;
  let fixture: ComponentFixture<ControleAceesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleAceesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleAceesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
