import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Verifica la ruta al servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}
