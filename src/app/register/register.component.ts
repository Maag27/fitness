import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule para *ngIf y otras directivas
import { Router } from '@angular/router'; 

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
  passwordError: string = '';  // Variable para mostrar errores de la contraseña
  isPasswordValid: boolean = false;  // Estado de validación de la contraseña
  private auth: Auth = inject(Auth);  // Inyecta el servicio de autenticación
  private router: Router = inject(Router);

  constructor() {}

  registerN() {
    this.router.navigate(['/login']);
  }

  // Método para validar la contraseña
  validatePassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (this.password.includes(' ')) {
      this.passwordError = 'La contraseña no debe contener espacios en blanco.';
      this.isPasswordValid = false;
    } else if (!passwordRegex.test(this.password)) {
      this.passwordError = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
      this.isPasswordValid = false;
    } else {
      this.passwordError = '';
      this.isPasswordValid = true;
    }
  }

  // Método para el registro del usuario
  onRegister() {
    // Llama al método de validación de la contraseña
    this.validatePassword();

    // Verifica si la contraseña es válida antes de proceder
    if (!this.isPasswordValid) {
      this.registrationSuccess = null;  // Limpiar mensaje de éxito
      return;
    }

    // Registra al usuario usando Firebase Authentication
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

