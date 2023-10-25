import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from './model/usuario';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearTareaComponent } from './modules/crear-tarea/crear-tarea.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyTask';
  perfilData: any;
  usuarioLogueado: boolean = false; // Variable para controlar si el usuario ha iniciado sesión
  public baseUrl = environment.backendUrl;
  private _items = new BehaviorSubject<Usuario[]>([]);

  set items(value: Usuario[]) {
    this._items.next(value);
  }

  get items() {
    return this._items.getValue();
  }

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private modalService: NgbModal) {
    this.authService.usuarioAutenticado$.subscribe((autenticado) => {
      this.usuarioLogueado = autenticado;
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);

      this.http.get<any>(`${this.baseUrl}perfil`, { headers }).subscribe({
        next: (response) => {
          this.perfilData = response.user;
          this.items = response.user;

          if (this.router.url === '/perfil') {
            this.redirigirAInicioSesion();
          }

        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401 && error.error.message === 'Acceso no autorizado') {
            this.cerrarSesion();
          }
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  redirigirAPrincipal() {
    this.router.navigate(['/principal']);
  }

  redirigirAuth() {
    this.router.navigate(['/auth']);
  }

  redirigirTareas() {
    this.router.navigate(['/tareas']);
  }

  redirigirCrearTarea() {
    const modal = this.modalService.open(CrearTareaComponent);
    modal.result.then(
      this.handleModalCrearTareaClose.bind(this),
      this.handleModalCrearTareaClose.bind(this)
    )
  }

  handleModalCrearTareaClose(){
    alert("Se ha cerrado el modal");
  }

  cerrarSesion() {
    this.authService.usuarioAutenticado$.subscribe((autenticado) => {
      this.usuarioLogueado = autenticado;
    });
    this.authService.cerrarSesion();
  }

  redirigirAInicioSesion() {
    this.router.navigateByUrl('/perfil', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/perfil']).then(() => {
        this.ngOnInit();
      });
    });
  }

  getUserID(): string | null {
    if (this.perfilData) {
      return this.perfilData._id;
    }
    return null;
  }
  getNombre(): string | null {
    if (this.perfilData) {
      return this.perfilData.nombre;
    }
    return null;
  }

}
