import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://backendfitnesstracking.onrender.com/api'; // URL base del backend

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  // Método para obtener métricas del usuario actual
  getUserMetrics(): Observable<any> {
    const userId = this.authService.getUserId();
    console.log("userId enviado:", userId);

    if (!userId) {
      console.error("No hay usuario autenticado. Redirigiendo al login...");
      this.router.navigate(['/login']);
      return throwError(() => new Error("No hay usuario autenticado"));
    }

    return this.http.get(`${this.apiUrl}/usermetrics/${userId}`).pipe(
      catchError((error) => {
        console.error("Error al obtener métricas:", error);
        this.router.navigate(['/login']);
        return throwError(() => new Error(error));
      })
    );
  }

  // Método para agregar métricas del usuario, incluyendo nombre y apellido
  addUserMetric(metricValue: any): Observable<any> { 
    const userId = this.authService.getUserId();

    if (!userId) {
      console.error("No hay usuario autenticado. Redirigiendo al login...");
      this.router.navigate(['/login']);
      return throwError(() => new Error("No hay usuario autenticado"));
    }

    const userMetric = { 
      userId: userId,
      nombre: metricValue.nombre,
      apellido: metricValue.apellido,
      edad: metricValue.edad,
      peso: metricValue.peso,
      altura: metricValue.altura
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/usermetrics`, userMetric, { headers }).pipe(
      catchError((error) => {
        console.error("Error al agregar métricas:", error);
        this.router.navigate(['/login']);
        return throwError(() => new Error(error));
      })
    );
  }

  // Método para obtener estadísticas adicionales
  getUserStatistics(nombre: string, apellido: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUserStatistics`, {
      params: { nombre, apellido }
    }).pipe(
      catchError((error) => {
        console.error("Error al obtener estadísticas:", error);
        this.router.navigate(['/login']);
        return throwError(() => new Error(error));
      })
    );
  }
}
