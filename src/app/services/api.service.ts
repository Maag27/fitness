import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://backendfitnesstracking.onrender.com/api'; // URL base del backend

  constructor(private http: HttpClient, private router: Router) {}

  // Método genérico para GET
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Método genérico para POST
  post<T>(endpoint: string, body: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Método genérico para PUT
  put<T>(endpoint: string, body: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Método genérico para DELETE
  delete<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { params }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Manejo de errores con redirección al login
  private handleError(error: any): Observable<never> {
    console.error('Error en ApiService:', error);
    if (error.status === 401 || error.status === 403) {
      console.warn('No autorizado. Redirigiendo al login...');
      this.router.navigate(['/login']);
    }
    return throwError(() => new Error(error.message || 'Error desconocido'));
  }
}
