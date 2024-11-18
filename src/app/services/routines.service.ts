import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class RoutinesService {
  constructor(private apiService: ApiService) {}

  /**
   * Obtiene todas las rutinas predefinidas disponibles.
   * 
   * @returns Un Observable con la lista de rutinas predefinidas.
   */
  getRoutineTemplates(): Observable<any> {
    return this.apiService.get<any>('routines/template-routines');
  }
  /**
   * Obtiene los ejercicios asociados a una rutina predefinida.
   * 
   * @param routineTemplateId El ID de la rutina predefinida.
   * @returns Un Observable con los ejercicios asociados.
   */
  getExercisesByRoutineTemplateId(routineTemplateId: number): Observable<any> {
    if (!routineTemplateId) {
      console.error('routineTemplateId es inválido o undefined.');
      return throwError(() => new Error('routineTemplateId es requerido.'));
    }
    return this.apiService.get<any>(`routines/template-routines/${routineTemplateId}/exercises`);
  }

  /**
   * Crea una rutina personalizada para un usuario basándose en una plantilla de rutina.
   * 
   * @param userId El ID del usuario que crea la rutina.
   * @param routineTemplateId El ID de la plantilla de rutina seleccionada.
   * @returns Un Observable con la respuesta de la API tras la creación.
   */
  createUserRoutine(userId: string, routineTemplateId: number, exerciseTemplateId: number): Observable<any> {
    const requestBody = { userId, routineTemplateId, exerciseTemplateId };
    return this.apiService.post<any>('routines/create-user-routine', requestBody);
  }
  

  /**
   * Obtiene todas las rutinas personalizadas creadas por un usuario.
   * 
   * @param userId El ID del usuario cuyas rutinas se desean obtener.
   * @returns Un Observable con la lista de rutinas personalizadas.
   */
  getUserRoutines(userId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`routines/user-routines?userId=${userId}`);
  }

  /**
   * Edita una rutina personalizada de un usuario.
   * 
   * @param routineId El ID de la rutina que se desea editar.
   * @param updatedData Los datos actualizados de la rutina.
   * @returns Un Observable con la respuesta de la API tras la edición.
   */
  editUserRoutine(routineId: number, updatedData: any): Observable<any> {
    return this.apiService.put<any>(`routines/user-routines/${routineId}`, updatedData);
  }

  /**
   * Elimina una rutina personalizada de un usuario.
   * 
   * @param routineId El ID de la rutina que se desea eliminar.
   * @returns Un Observable con la respuesta de la API tras la eliminación.
   */
  deleteUserRoutine(routineId: number): Observable<any> {
    return this.apiService.delete<any>(`routines/user-routines/${routineId}`);
  }

  
}
