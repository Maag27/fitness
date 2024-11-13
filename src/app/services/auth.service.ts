// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;

  constructor(private auth: Auth, private router: Router) {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? storedUserId : null;
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(result => {
        this.userId = result.user.uid;
        localStorage.setItem('userId', this.userId);
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(result => {
        this.userId = result.user.uid;
        localStorage.setItem('userId', this.userId);
      })
    );
  }

  getUserId(): string | null {
    return this.userId;
  }

  // Método para cerrar sesión con redireccionamiento al login
  logout(): void {
    this.auth.signOut().then(() => {
      this.userId = null;
      localStorage.removeItem('userId');
      this.router.navigate(['/login']); // Redirigimos al componente de login
    });
  }

  isAuthenticated(): boolean {
    // Verificamos si hay un userId en memoria o en localStorage
    return this.userId !== null || localStorage.getItem('userId') !== null;
  }
}
