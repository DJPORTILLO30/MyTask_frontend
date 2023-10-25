import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  const routerStub = {
    navigate: (commands: any[], extras?: any) => {},
    url: '',
  };

  const authServiceStub = {
    usuarioAutenticado$: new BehaviorSubject<boolean>(false),
    cerrarSesion: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authServiceStub },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should not navigate to /perfil if no token is in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Mock localStorage.getItem
    spyOn(router, 'navigate'); // Spy on router.navigate

    component.ngOnInit();

    expect(router.navigate).not.toHaveBeenCalledWith(['/perfil']);
  });



  // Add more tests for other methods and scenarios as needed
});
