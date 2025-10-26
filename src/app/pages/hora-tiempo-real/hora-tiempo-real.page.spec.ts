import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoraTiempoRealPage } from './hora-tiempo-real.page';

describe('HoraTiempoRealPage', () => {
  let component: HoraTiempoRealPage;
  let fixture: ComponentFixture<HoraTiempoRealPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraTiempoRealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
