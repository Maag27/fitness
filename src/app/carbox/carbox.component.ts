import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  routineForm: FormGroup;
  muscleGroups: any[] = [];
  availableExercises: any[] = [];
  isLoading: boolean = false;
  saveSuccessful: boolean = false;

  constructor(
    private fb: FormBuilder,
    private routinesService: RoutinesService,
    private authService: AuthService
  ) {
    this.routineForm = this.fb.group({
      muscleGroup: ['', Validators.required],
      exercise: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadMuscleGroups();

    this.routineForm.get('muscleGroup')?.valueChanges.subscribe((groupId) => {
      if (groupId) {
        this.loadExercisesForMuscleGroup(groupId);
      } else {
        this.availableExercises = [];
      }
    });
  }

  /**
   * Carga los grupos musculares desde el servicio.
   */
  loadMuscleGroups() {
    this.isLoading = true;
    this.routinesService.getRoutineTemplates().subscribe({
      next: (data: any[]) => {
        this.muscleGroups = data.map((routine: any) => ({
          id: routine.routineTemplateId,
          name: routine.routineName,
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando grupos musculares:', err);
        this.isLoading = false;
      },
    });
  }

  /**
   * Carga los ejercicios de un grupo muscular específico.
   *
   * @param muscleGroupId El ID del grupo muscular seleccionado.
   */
  loadExercisesForMuscleGroup(muscleGroupId: number) {
    this.isLoading = true;
    this.routinesService.getExercisesByRoutineTemplateId(muscleGroupId).subscribe({
      next: (data: any[]) => {
        this.availableExercises = data.map((ex: any) => ({
          id: ex.exerciseTemplateId,
          name: ex.exerciseName,
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando ejercicios:', err);
        this.isLoading = false;
      },
    });
  }

  /**
   * Guarda una nueva rutina personalizada.
   */
  saveRoutine() {
    if (this.routineForm.invalid) {
      this.routineForm.markAllAsTouched(); // Marca todos los campos como "tocados" para mostrar errores
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('Error: Usuario no autenticado.');
      return;
    }

    const muscleGroupId = this.routineForm.value.muscleGroup;
    const exerciseId = this.routineForm.value.exercise;

    this.isLoading = true;
    this.saveSuccessful = false; // Oculta el mensaje de éxito

    this.routinesService.createUserRoutine(userId, muscleGroupId, exerciseId).subscribe({
      next: (createdRoutine) => {
        this.isLoading = false;
        this.saveSuccessful = true; // Muestra mensaje de éxito
        this.routineCreated.emit(createdRoutine);
        this.resetRoutineForm();
        setTimeout(() => (this.saveSuccessful = false, window.location.reload()), 3000); // Oculta el mensaje después de 3 segundos
      },
      error: (err) => {
        console.error('Error creando la rutina:', err);
        this.isLoading = false;
      },
    });
  }

  /**
   * Reinicia el formulario.
   */
  resetRoutineForm() {
    this.routineForm.reset({ muscleGroup: '', exercise: '' });
  }
}
