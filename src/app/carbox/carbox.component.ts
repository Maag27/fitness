// src/app/carbox/carbox.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface Exercise {
  id: number;
  name: string;
  series: number;
  restTime: number; // Tiempo de descanso en segundos
}

interface MuscleGroup {
  id: number;
  name: string;
}

interface ExercisesByGroup {
  [key: number]: Exercise[];
}

@Component({
  selector: 'app-carbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './carbox.component.html',
  styleUrls: ['./carbox.component.scss'],
})
export class CarboxComponent implements OnInit {
  routineForm: FormGroup;
  muscleGroups: MuscleGroup[] = [];
  availableExercises: Exercise[] = [];
  savedRoutines: any[] = [];

  constructor(private fb: FormBuilder) {
    this.routineForm = this.fb.group({
      muscleGroup: [''],
      exercise: [''],
      repetitions: [''],
      series: [{value: '', disabled: true}],
      restTime: [{value: '', disabled: true}]
    });
  }

  ngOnInit() {
    // Mockea los grupos musculares
    this.loadMuscleGroups();

    // Escuchar cambios en el grupo muscular seleccionado
    this.routineForm.get('muscleGroup')?.valueChanges.subscribe(groupId => {
      if (groupId) {
        // Mockea los ejercicios disponibles para el grupo muscular seleccionado
        this.loadExercisesForMuscleGroup(groupId);
      } else {
        this.availableExercises = [];
      }
      this.routineForm.patchValue({ exercise: '', repetitions: '', series: '', restTime: '' }, { emitEvent: false });
    });

    // Escuchar cambios en el ejercicio seleccionado
    this.routineForm.get('exercise')?.valueChanges.subscribe(exerciseId => {
      if (exerciseId) {
        const selectedExercise = this.availableExercises.find(exercise => exercise.id === exerciseId);
        if (selectedExercise) {
          this.routineForm.patchValue({
            series: selectedExercise.series,
            restTime: selectedExercise.restTime
          });
          this.routineForm.get('series')?.enable();
          this.routineForm.get('restTime')?.enable();
        }
      } else {
        this.routineForm.get('series')?.disable();
        this.routineForm.get('restTime')?.disable();
      }
    });
  }

  loadMuscleGroups() {
    // Mockeo de los grupos musculares
    this.muscleGroups = [
      { id: 1, name: 'Pecho' },
      { id: 2, name: 'Espalda' },
      { id: 3, name: 'Piernas' }
    ];
  }

  loadExercisesForMuscleGroup(muscleGroupId: number) {
    // Mockeo de los ejercicios según el grupo muscular
    const exercises: ExercisesByGroup = {
      1: [
        { id: 1, name: 'Press de banca', series: 4, restTime: 60 },
        { id: 2, name: 'Aperturas con mancuernas', series: 3, restTime: 45 }
      ],
      2: [
        { id: 3, name: 'Remo con barra', series: 4, restTime: 60 },
        { id: 4, name: 'Dominadas', series: 3, restTime: 90 }
      ],
      3: [
        { id: 5, name: 'Sentadillas', series: 4, restTime: 120 },
        { id: 6, name: 'Prensa de piernas', series: 4, restTime: 90 }
      ]
    };
    this.availableExercises = exercises[muscleGroupId] || [];
  }

  saveRoutine() {
    if (this.routineForm.valid) {
      // Añadir la rutina a savedRoutines
      const routine = this.routineForm.value;
      const muscleGroupName = this.muscleGroups.find(group => group.id === routine.muscleGroup)?.name;
      const exerciseName = this.availableExercises.find(exercise => exercise.id === routine.exercise)?.name;

      this.savedRoutines.push({
        id: Date.now(),  // Usar timestamp como ID temporal
        muscleGroupName: muscleGroupName || '',
        exerciseName: exerciseName || '',
        repetitions: routine.repetitions,
        series: routine.series,
        restTime: routine.restTime
      });

      this.routineForm.reset();
      this.routineForm.get('series')?.disable();
      this.routineForm.get('restTime')?.disable();
    }
  }

  deleteRoutine(routineId: number) {
    // Eliminar la rutina del array savedRoutines
    this.savedRoutines = this.savedRoutines.filter(routine => routine.id !== routineId);
  }
}
