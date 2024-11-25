import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinesService } from '../services/routines.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-routine-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routine-table.component.html',
  styleUrls: ['./routine-table.component.scss'],
})
export class RoutineTableComponent implements OnInit {
  @Input() selectedRoutineId?: number; // ID de la rutina seleccionada (si es necesario filtrar por rutina)
  @Output() routinesUpdated = new EventEmitter<any[]>(); // Evento para notificar cambios en las rutinas

  savedRoutines: any[] = []; // Lista final de rutinas con ejercicios formateados

  constructor(
    private routinesService: RoutinesService, // Servicio para acceder a las rutinas
    private authService: AuthService // Servicio para obtener datos del usuario autenticado
  ) {}

  ngOnInit() {
    this.loadUserRoutines(); // Cargar rutinas al iniciar el componente
  }

  /**
   * Carga las rutinas personalizadas del usuario y las formatea con sus respectivos nombres.
   */
  loadUserRoutines() {
    const userId = this.authService.getUserId(); // Obtener el ID del usuario autenticado

    if (!userId) {
      console.error('Error: Usuario no autenticado.');
      return;
    }

    // Obtener las rutinas del usuario
    this.routinesService.getUserRoutines(userId).subscribe({
      next: async (routines) => {
        this.savedRoutines = await this.mapRoutinesWithNames(routines); // Mapear los datos para incluir los nombres
      },
      error: (error) => {
        console.error('Error cargando las rutinas del usuario:', error);
      },
    });
  }

  /**
   * Mapea las rutinas del usuario para agregar nombres de rutina y de ejercicio.
   * 
   * @param routines Lista de rutinas obtenidas del backend.
   * @returns Lista de rutinas con nombres y ejercicios formateados.
   */
  async mapRoutinesWithNames(routines: any[]): Promise<any[]> {
    const routineTemplates = await this.routinesService.getRoutineTemplates().toPromise();
  
    if (!routineTemplates || routineTemplates.length === 0) {
      console.error('No se encontraron plantillas de rutinas.');
      return [];
    }
  
    const formattedRoutines = [];
  
    for (const routine of routines) {
      const routineTemplate = routineTemplates.find(
        (rt: any) => rt.routineTemplateId === routine.routineTemplateId
      );
      const routineName = routineTemplate?.routineName || 'Sin nombre';
  
      const exercises = await this.routinesService
        .getExercisesByRoutineTemplateId(routine.routineTemplateId)
        .toPromise();
  
      if (!exercises || exercises.length === 0) {
        console.warn(`No se encontraron ejercicios para la rutina con ID ${routine.routineTemplateId}`);
        continue;
      }
  
      for (const exercise of routine.userExercises) {
        const exerciseTemplate = exercises.find(
          (et: any) => et.exerciseTemplateId === exercise.exerciseTemplateId
        );
        const exerciseName = exerciseTemplate?.exerciseName || 'Sin nombre';
  
        const details = exercise.userExerciseDetails[0] || {};
        formattedRoutines.push({
          userRoutineId: routine.userRoutineId, // ID de la rutina personalizada
          routineName,
          exerciseName,
          repetitions: details.repetitions || 'N/A',
          series: details.series || 'N/A',
          restTime: details.restTime || 'N/A',
        });
      }
    }
  
    return formattedRoutines;
  }

  /**
   * Maneja la edición de una rutina.
   * 
   * @param routine La rutina que se desea editar.
   */
  editRoutine(routine: any) {
    const updatedRoutine = { ...routine }; // Clonar la rutina para editarla
    this.routinesService.editUserRoutine(updatedRoutine.userRoutineId, updatedRoutine).subscribe({
      next: () => this.loadUserRoutines(), // Recargar las rutinas después de editar
      error: (error) => console.error('Error actualizando la rutina:', error),
    });
  }

  /**
   * Maneja la eliminación de una rutina.
   * 
   * @param userRoutineId El ID de la rutina personalizada que se desea eliminar.
   */
  deleteRoutine(userRoutineId: number) {
    this.routinesService.deleteUserRoutine(userRoutineId).subscribe({
      next: () => {
        this.savedRoutines = this.savedRoutines.filter((r) => r.userRoutineId !== userRoutineId); // Filtrar la rutina eliminada
        this.routinesUpdated.emit(this.savedRoutines); // Emitir el evento de actualización
      },
      error: (error) => console.error('Error eliminando la rutina:', error),
    });
  }
}
