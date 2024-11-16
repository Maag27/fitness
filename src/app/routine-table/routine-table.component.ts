import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routine-table',
  standalone: true, // Convertir en standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './routine-table.component.html',
  styleUrls: ['./routine-table.component.scss'],
})
export class RoutineTableComponent {
  @Input() savedRoutines: any[] = [];
  @Output() deleteRoutineEvent = new EventEmitter<number>();

  deleteRoutine(routineId: number) {
    this.deleteRoutineEvent.emit(routineId);
  }

  editRoutine(routine: any) {
    alert(`Editar rutina: ${routine.exerciseName}`);
  }
}
