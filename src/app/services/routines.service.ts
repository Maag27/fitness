import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  constructor(private apiService: ApiService) {}


  

  // Obtener todas las rutinas predefinidas
  getRoutineTemplates(): Observable<any> {
    return this.apiService.get<any>('routines/template-routines');
  }

  // Obtener los ejercicios de una rutina predefinida
  getExercisesByRoutineTemplateId(routineTemplateId: number): Observable<any> {
    if (!routineTemplateId) {
      console.error('routineTemplateId es inválido o undefined.');
      return throwError(() => new Error('routineTemplateId es requerido.'));
    }
  
    return this.apiService.get<any>(`routines/template-routines/${routineTemplateId}/exercises`);
  }

  // Crear una rutina personalizada para el usuario
  createUserRoutine(userId: string, routineTemplateId: number): Observable<any> {
    const params = { userId, routineTemplateId: routineTemplateId.toString() };
    return this.apiService.post<any>('routines/create-user-routine', params);
  }
}
