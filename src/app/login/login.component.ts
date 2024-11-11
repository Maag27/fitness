import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importa el AuthService
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar *ngIf


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true, // Define el componente como standalone
  imports: [FormsModule, CommonModule] // Asegura que FormsModule está importado aquí
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string | null = null;
  loginSuccess: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // Método de inicio de sesión
  onLogin() {
    this.clearMessages(); // Limpia los mensajes de éxito/error previos

    if (this.isPasswordInvalid()) { // Verifica si la contraseña tiene menos de 6 caracteres
      this.loginError = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (result) => this.handleLoginSuccess(result),
      error: (error) => this.handleLoginError(error)
    });
  }

  // Método para redirigir al componente de registro
  loginN() {
    this.router.navigate(['/register']); // Redirige a la ruta de registro
  }

  private clearMessages() {
    this.loginError = null;
    this.loginSuccess = null;
  }

  private isPasswordInvalid(): boolean {
    return this.password.length < 6;
  }

  private handleLoginSuccess(result: any) {
    this.loginSuccess = '¡Inicio de sesión exitoso!';
    console.log('Usuario autenticado con UID:', this.authService.getUserId()); // Muestra el userId en la consola
    this.router.navigate(['/home']); // Redirige al dashboard
  }

  private handleLoginError(error: any) {
    switch (error.code) {
      case 'auth/wrong-password':
        this.loginError = 'Contraseña incorrecta. Inténtalo nuevamente.';
        break;
      case 'auth/user-not-found':
        this.loginError = 'Usuario no encontrado. Verifica tu correo.';
        break;
      case 'auth/invalid-email':
        this.loginError = 'Formato de correo inválido.';
        break;
      case 'auth/too-many-requests':
        this.loginError = 'Demasiados intentos fallidos. Inténtalo más tarde.';
        break;
      default:
        this.loginError = 'Error al iniciar sesión. Inténtalo nuevamente.';
    }
    console.error('Error de inicio de sesión:', error);
  }
}
