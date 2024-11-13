import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://backendfitnesstracking.onrender.com/api'; // URL base del backend en Render

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener métricas del usuario actual
  getUserMetrics(): Observable<any> {
    const userId = this.authService.getUserId();
    console.log("userId enviado:", userId);  // Verificar el userId en el frontend

    if (!userId) {
      throw new Error("No hay usuario autenticado"); // Manejo de error si no hay usuario
    }
    return this.http.get(`${this.apiUrl}/usermetrics/${userId}`);
  }

  // Método para agregar métricas del usuario, incluyendo nombre y apellido
  addUserMetric(metricValue: any): Observable<any> { 
    const userId = this.authService.getUserId();

    if (!userId) {
      throw new Error("No hay usuario autenticado");
    }

    const userMetric = { 
      userId: userId,
      nombre: metricValue.nombre,     // Nuevo campo
      apellido: metricValue.apellido, // Nuevo campo
      edad: metricValue.edad,
      peso: metricValue.peso,
      altura: metricValue.altura
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/usermetrics`, userMetric, { headers });
  }

  // Método para obtener estadísticas adicionales
  getUserStatistics(nombre: string, apellido: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUserStatistics`, {
      params: { nombre, apellido }
    });
  }
}
