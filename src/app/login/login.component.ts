import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { CommonModule } from '@angular/common';  // Importa CommonModule para *ngIf y otras directivas comunes

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,  // Indica que es un componente independiente
  imports: [FormsModule, CommonModule]  // Importa FormsModule y CommonModule
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string | null = null;
  loginSuccess: string | null = null;
  private auth: Auth = inject(Auth); // Inyecta el servicio de autenticación

  constructor() {}

  onLogin() {
    if (this.password.length < 6) {
      this.loginError = 'Password must be at least 6 characters long.';
      return;
    }

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(result => {
        this.loginError = null; // Limpiar cualquier error previo
        this.loginSuccess = 'Login successful!';
        console.log('User logged in:', result);
      })
      .catch(error => {
        this.loginSuccess = null; // Limpiar cualquier mensaje de éxito previo
        if (error.code === 'auth/wrong-password') {
          this.loginError = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/user-not-found') {
          this.loginError = 'User not found. Please check your email.';
        } else {
          this.loginError = 'Login failed. Please try again.';
        }
        console.error('Login error:', error);
      });
  }
}
