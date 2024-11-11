import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    if (!userId) {
      throw new Error("No hay usuario autenticado"); // Manejo de error si no hay usuario
    }
    return this.http.get(`${this.apiUrl}/usermetrics/${userId}`);
  }

  addUserMetric(metricValue: any): Observable<any> { 
    const userId = this.authService.getUserId();
  
    if (!userId) {
        throw new Error("No hay usuario autenticado");
    }
      
    // Ajustamos el objeto para que coincida con lo que espera el backend
    const userMetric = { 
        userId: userId, 
        edad: metricValue.edad, 
        peso: metricValue.peso, 
        altura: metricValue.altura
    };

    return this.http.post(`${this.apiUrl}/usermetrics`, userMetric);
}

  // Método para obtener estadísticas adicionales
  getUserStatistics(nombre: string, apellido: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUserStatistics`, {
      params: { nombre, apellido }
    });
  }
}
