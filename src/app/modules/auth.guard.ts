import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    // Comprueba si el usuario está autenticado
    if (this.authService.usuarioAutenticado$) {
      return true;
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      return this.router.createUrlTree(['/auth']);
    }
  }
}
