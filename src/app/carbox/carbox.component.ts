import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutinesService } from '../services/routines.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './carbox.component.html',
  styleUrls: ['./carbox.component.scss'],
})
export class CarboxComponent implements OnInit {
  @Output() routineCreated = new EventEmitter<any>();
  routineForm: FormGroup; // Formulario reactivo
  muscleGroups: any[] = []; // Lista de grupos musculares
  availableExercises: any[] = []; // Lista de ejercicios disponibles

  constructor(
    private fb: FormBuilder,
    private routinesService: RoutinesService,
    private authService: AuthService
  ) {
    this.routineForm = this.fb.group({
      muscleGroup: [''], // Grupo muscular seleccionado
      exercise: [''], // Ejercicio seleccionado
      repetitions: [{ value: '', disabled: true }], // Repeticiones del ejercicio
      series: [{ value: '', disabled: true }], // Series del ejercicio
      restTime: [{ value: '', disabled: true }], // Tiempo de descanso
    });
  }

  ngOnInit() {
    this.loadMuscleGroups();
    this.routineForm.get('muscleGroup')?.valueChanges.subscribe((groupId) => {
      if (groupId) this.loadExercisesForMuscleGroup(groupId);
      else this.availableExercises = [];
      this.resetExerciseFields();
    });

    this.routineForm.get('exercise')?.valueChanges.subscribe((exerciseId: string | number) => {
      const selectedExercise = this.availableExercises.find((ex: any) => ex.id === +exerciseId);
      if (selectedExercise) {
        const details = selectedExercise.exerciseDetails[0];
        this.routineForm.patchValue({
          repetitions: details?.repetitions || '',
          series: details?.series || '',
          restTime: details?.restTime || '',
        });
        this.enableExerciseFields();
      }
    });
  }

  /**
   * Carga los grupos musculares desde el servicio.
   */
  loadMuscleGroups() {
    this.routinesService.getRoutineTemplates().subscribe((data: any[]) => {
      this.muscleGroups = data.map((routine: any) => ({
        id: routine.routineTemplateId,
        name: routine.routineName,
      }));
    });
  }

  /**
   * Carga los ejercicios de un grupo muscular específico.
   * 
   * @param muscleGroupId El ID del grupo muscular seleccionado.
   */
  loadExercisesForMuscleGroup(muscleGroupId: number) {
    this.routinesService.getExercisesByRoutineTemplateId(muscleGroupId).subscribe((data: any[]) => {
      this.availableExercises = data.map((ex: any) => ({
        id: ex.exerciseTemplateId,
        name: ex.exerciseName,
        exerciseDetails: ex.exerciseDetails,
      }));
    });
  }

  /**
   * Guarda una nueva rutina personalizada para el usuario autenticado.
   */
    saveRoutine() {
      const userId = this.authService.getUserId(); // Obtener el ID del usuario autenticado
    
      if (!userId) {
        console.error('Error: Usuario no autenticado.');
        return;
      }
    
      const muscleGroupId = this.routineForm.value.muscleGroup;
      const exerciseId = this.routineForm.value.exercise; // Obtener el ID del ejercicio seleccionado
    
      this.routinesService.createUserRoutine(userId, muscleGroupId, exerciseId).subscribe({
        next: (createdRoutine) => {
          this.routineCreated.emit(createdRoutine); // Notifica que la rutina fue creada
          this.resetRoutineForm(); // Reinicia el formulario
        },
        error: (err) => console.error('Error creando la rutina:', err),
      });
    }
  

  resetRoutineForm() {
    this.routineForm.reset({ muscleGroup: '', exercise: '' });
    this.disableExerciseFields();
  }

  enableExerciseFields() {
    this.routineForm.get('repetitions')?.enable();
    this.routineForm.get('series')?.enable();
    this.routineForm.get('restTime')?.enable();
  }

  disableExerciseFields() {
    this.routineForm.get('repetitions')?.disable();
    this.routineForm.get('series')?.disable();
    this.routineForm.get('restTime')?.disable();
  }

  resetExerciseFields() {
    this.routineForm.patchValue({
      exercise: '',
      repetitions: '',
      series: '',
      restTime: '',
    });
    this.disableExerciseFields();
  }
}
