import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface InicioSesionUsuario {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuarioAutenticado = new BehaviorSubject<boolean>(false);
  private baseUrl = environment.backendUrl;

  constructor(private http: HttpClient, private router: Router) {}

  get usuarioAutenticado$(): Observable<boolean> {
    return this.usuarioAutenticado.asObservable();
  }

  iniciarSesion(datosInicioSesion: InicioSesionUsuario) {
    if (!datosInicioSesion.email || !datosInicioSesion.password) {
      console.error('Por favor, complete todos los campos.');
      return;
    }

    this.http.post(`${this.baseUrl}login`, datosInicioSesion).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso', response);
        this.router.navigate(['/perfil']);
        this.usuarioAutenticado.next(true);
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.usuarioAutenticado.next(false);
      }
    );
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
    this.usuarioAutenticado.next(false);
  }
}
