import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  usuarioLogueado: boolean = false; // Agrega una variable para controlar si el usuario ha iniciado sesión

  constructor(private router: Router) {}

  redirigirAPrincipal() {
    this.router.navigate(['/principal']);
  }

  redirigirAuth() {
    this.router.navigate(['/auth']);
  }

  redirigirTareas() {
    this.router.navigate(['/tareas']);
  }

  redirigirRecientes() {
    this.router.navigate(['/recientes']);
  }

  redirigirSubidas() {
    this.router.navigate(['/subidas']);
  }

  redirigirCrearTarea() {
    this.router.navigate(['/crear-tarea']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
    this.usuarioLogueado = false;
  }

  ngOnInit(): void {
    // Verifica si el usuario ha iniciado sesión, por ejemplo, consultando un token en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      this.usuarioLogueado = true;
    }
  }
}
