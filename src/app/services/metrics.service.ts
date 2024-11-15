import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private apiService: ApiService) {}

  // Obtener métricas del usuario autenticado
  getUserMetrics(userId: string): Observable<any> {
    return this.apiService.get<any>(`usermetrics/${userId}`);
  }

  // Agregar o actualizar métricas del usuario
  addUserMetric(userId: string, metricValue: any): Observable<any> {
    const userMetric = { userId, ...metricValue };
    return this.apiService.post<any>('usermetrics', userMetric);
  }

  // Obtener estadísticas del usuario
  getUserStatistics(nombre: string, apellido: string): Observable<any> {
    return this.apiService.get<any>('GetUserStatistics', { nombre, apellido });
  }
}
