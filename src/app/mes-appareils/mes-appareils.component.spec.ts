import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAppareilsComponent } from './mes-appareils.component';

describe('MesAppareilsComponent', () => {
  let component: MesAppareilsComponent;
  let fixture: ComponentFixture<MesAppareilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesAppareilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesAppareilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
