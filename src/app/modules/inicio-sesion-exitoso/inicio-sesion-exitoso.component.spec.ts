import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSesionExitosoComponent } from './inicio-sesion-exitoso.component';

describe('InicioSesionExitosoComponent', () => {
  let component: InicioSesionExitosoComponent;
  let fixture: ComponentFixture<InicioSesionExitosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioSesionExitosoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioSesionExitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
