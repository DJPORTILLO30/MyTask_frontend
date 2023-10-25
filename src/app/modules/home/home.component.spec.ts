import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  const routerStub = {
    navigate: (commands: any[], extras?: any) => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
      providers: [{ provide: Router, useValue: routerStub }],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /perfil if a token is in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('your-token'); // Mock localStorage.getItem
    spyOn(router, 'navigate'); // Spy on router.navigate

    component.ngOnInit(); // Call the ngOnInit method

    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
  });

  it('should not navigate to /perfil if no token is in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Mock localStorage.getItem
    spyOn(router, 'navigate'); // Spy on router.navigate

    component.ngOnInit(); // Call the ngOnInit method

    expect(router.navigate).not.toHaveBeenCalledWith(['/perfil']);
  });

  // Add more tests for other scenarios as needed
});
