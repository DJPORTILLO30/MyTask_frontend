import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthComponent } from './modules/auth/auth.component';
import { InicioSesionExitosoComponent } from './modules/inicio-sesion-exitoso/inicio-sesion-exitoso.component';
import { AuthGuard } from './modules/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/principal",
    pathMatch: "full"
  },
  {
    path: "principal",
    component: HomeComponent
  },
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "perfil",
    canActivate: [AuthGuard],
    component: InicioSesionExitosoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
