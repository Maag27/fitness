import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null; // Almacena el userId después de iniciar sesión

  constructor(private auth: Auth) {}

  // Método para iniciar sesión y capturar el userId
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(result => this.userId = result.user.uid) // Guarda el userId después de iniciar sesión
    );
  }

  // Método para registrar un nuevo usuario
  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(result => this.userId = result.user.uid) // Guarda el userId después del registro
    );
  }

  // Método para obtener el userId actual
  getUserId(): string | null {
    return this.userId;
  }

  logout(): void {
    this.auth.signOut();
    this.userId = null; // Limpia el userId al cerrar sesión
  }
}
