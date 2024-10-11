import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { CommonModule } from '@angular/common';  // Para *ngIf

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,  // Especifica que es un componente standalone
  imports: [FormsModule, CommonModule],  // Importa FormsModule aquí
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string | null = null;
  loginSuccess: string | null = null;
  
  private auth: Auth = inject(Auth);  // Inyecta el servicio de autenticación
  private router: Router = inject(Router);  // Inyecta el servicio de enrutamiento

  loginN() {
    this.router.navigate(['/register']);
  }

  // Método de inicio de sesión
  onLogin() {
    this.clearMessages();  // Limpia los mensajes de éxito/error previos

    if (this.isPasswordInvalid()) {  // Verifica si la contraseña tiene menos de 6 caracteres
      this.loginError = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(result => {
        this.handleLoginSuccess(result);  // Maneja el éxito del login
      })
      .catch(error => {
        this.handleLoginError(error);  // Maneja los errores del login
      });
  }

  // Limpia mensajes de error y éxito
  private clearMessages() {
    this.loginError = null;
    this.loginSuccess = null;
  }

  // Verifica si la contraseña es inválida (menos de 6 caracteres)
  private isPasswordInvalid(): boolean {
    return this.password.length < 6;
  }

  // Maneja el éxito del inicio de sesión
  private handleLoginSuccess(result: any) {
    this.loginSuccess = '¡Inicio de sesión exitoso!';
    console.log('Usuario autenticado:', result);
    this.router.navigate(['/home']);  // Redirige a la página de dashboard
  }

  // Maneja los errores de inicio de sesión
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
