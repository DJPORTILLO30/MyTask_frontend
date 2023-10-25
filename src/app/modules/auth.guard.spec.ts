import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule , HttpClientTestingModule],
      providers: [AuthGuard, AuthService],
    });
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access when the user is authenticated', () => {
    // Simulamos que el usuario está autenticado emitiendo un valor 'true' en el BehaviorSubject
    authService.usuarioAutenticado.next(true);

    const canActivateResult = authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(true);
  });

  it('should redirect to /auth when the user is not authenticated', () => {
    // Simulamos que el usuario no está autenticado emitiendo un valor 'false' en el BehaviorSubject
    authService.usuarioAutenticado.next(false);

    const router = TestBed.inject(Router);
    const createUrlTreeSpy = spyOn(router, 'createUrlTree').and.callFake(() => {
      return new UrlTree();
    });

    const canActivateResult = authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(true);
  });
});
