import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  mostrarRegistro: boolean = false;
  datosRegistro: FormGroup;
  datosInicioSesion: FormGroup;

  submittedInicioSesion: boolean = false; // Nueva variable para seguimiento del formulario
  submittedRegistro: boolean = false; // Nueva variable para seguimiento del formulario

  showEmailAlert: boolean = false;
  showPasswordAlert: boolean = false;
  showUsernameAlert: boolean = false;


  public baseUrl = environment.backendUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.datosRegistro = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.datosInicioSesion = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  alternarFormulario() {
    this.mostrarRegistro = !this.mostrarRegistro;
  }

  registrarUsuario() {
  this.submittedRegistro = true;
  if (this.datosRegistro.valid) {
    const datosRegistro = this.datosRegistro.value;
    this.http.post(`${this.baseUrl}register`, datosRegistro).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        // Reiniciar la visibilidad de los alertas
        this.showEmailAlert = false;
        this.showPasswordAlert = false;
        this.showUsernameAlert = false;
      },
      (error) => {
        console.error('Error al registrar usuario', error);
        // Mostrar alertas según los errores específicos, si es necesario
        if (error.status === 400) {
          // Por ejemplo, si el servidor devuelve un error 400 (Bad Request), puedes manejarlo aquí
          if (error.error && error.error.message === 'Username already exists') {
            this.showUsernameAlert = true;
          }
          // Puedes manejar otros errores de manera similar
        }
      }
    );
  } else {
    // Marcar alertas como visibles si el formulario no es válido
    this.showEmailAlert = true;
    this.showPasswordAlert = true;
    this.showUsernameAlert = true;
    console.error('Por favor, complete todos los campos correctamente.');
  }
}

iniciarSesion() {
  this.submittedInicioSesion = true;
  if (this.datosInicioSesion.valid) {
    const datosInicioSesion = this.datosInicioSesion.value;
    this.authService.iniciarSesion(datosInicioSesion);
  } else {
    // Marcar alertas como visibles si el formulario no es válido
    this.showEmailAlert = true;
    this.showPasswordAlert = true;
    console.error('Por favor, complete todos los campos correctamente.');
  }
}


  ngOnInit(): void {
  }
}
