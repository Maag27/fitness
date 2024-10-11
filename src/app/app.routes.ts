import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { hideNavbarFooter: true } },
  { path: 'register', component: RegisterComponent, data: { hideNavbarFooter: true } },
  { path: '', component: HomeComponent, data: { hideNavbarFooter: false } },
    { path: 'home', component: HomeComponent }, // Añade la ruta para HomeComponent
];
