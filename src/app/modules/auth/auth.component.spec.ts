import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';

describe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let component: AuthComponent;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder, AuthService],
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a registration request when the form is valid', () => {
    component.datosRegistro.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    });

    // Asegúrate de que AuthService.iniciarSesion no se llama aquí
    const iniciarSesionSpy = spyOn(authService, 'iniciarSesion');

    component.registrarUsuario();

    // Verifica que expectOne se haya llamado con la URL correcta
    const request = httpTestingController.expectOne(`${component.baseUrl}register`);
    expect(request.request.method).toBe('POST');

    // Responde a la solicitud simulada
    request.flush({ /* Respuesta esperada */ });

    // Verifica que AuthService.iniciarSesion no se llamó después de enviar la solicitud
    expect(iniciarSesionSpy).not.toHaveBeenCalled();
  });


  it('should handle invalid form and show alert', () => {
    component.datosRegistro.setValue({
      username: 'testuser',
      email: 'invalidemail', // Invalid email
      password: '', // Invalid password
    });

    const registerSpy = spyOn(httpTestingController, 'expectNone');
    
    component.registrarUsuario();
    
    expect(component.showEmailAlert).toBe(true);
    expect(component.showPasswordAlert).toBe(true);
    expect(component.showUsernameAlert).toBe(true);
  });
});
