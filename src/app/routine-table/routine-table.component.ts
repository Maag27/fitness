import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routine-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routine-table.component.html',
  styleUrls: ['./routine-table.component.scss'],
})
export class RoutineTableComponent {
  @Input() savedRoutines: any[] = []; // Recibir las rutinas desde el componente padre

  // Método para eliminar una rutina
  deleteRoutine(routineId: number) {
    this.savedRoutines = this.savedRoutines.filter(routine => routine.id !== routineId);
  }

  // Método para manejar cambios en un campo editable
  updateRoutineField(routineId: number, field: string, event: Event) {
    const inputElement = event.target as HTMLInputElement; // Obtiene el elemento HTMLInputElement
    const value = inputElement.value; // Valor del campo
    const routine = this.savedRoutines.find(r => r.id === routineId);
    if (routine) {
      routine[field] = value; // Actualiza el campo correspondiente
    }
  }

  // Método para editar (opcional, para acciones adicionales)
  editRoutine(routine: any) {
    alert(`Editar rutina: ${routine.exerciseName}`);
  }
}
