import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule para *ngIf y otras directivas

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]  // Asegúrate de incluir FormsModule y CommonModule aquí
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  registrationError: string | null = null;  // Variable para mostrar errores
  registrationSuccess: string | null = null;  // Variable para mostrar éxito
  private auth: Auth = inject(Auth);  // Inyecta el servicio de autenticación

  constructor() {}

  onRegister() {
    if (this.password.length < 6) {
      this.registrationError = 'Password must be at least 6 characters long.';
      this.registrationSuccess = null;  // Limpiar mensaje de éxito
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(result => {
        this.registrationError = null;  // Limpiar errores previos
        this.registrationSuccess = 'Registration successful!';  // Mostrar mensaje de éxito
        console.log('User registered:', result);
      })
      .catch(error => {
        this.registrationSuccess = null;  // Limpiar mensajes de éxito previos
        if (error.code === 'auth/email-already-in-use') {
          this.registrationError = 'This email is already in use. Please try another email.';
        } else if (error.code === 'auth/invalid-email') {
          this.registrationError = 'The email address is not valid. Please check and try again.';
        } else if (error.code === 'auth/weak-password') {
          this.registrationError = 'The password is too weak. Please enter a stronger password.';
        } else {
          this.registrationError = 'Registration failed. Please try again later.';
        }
        console.error('Registration error:', error);
      });
  }
}
