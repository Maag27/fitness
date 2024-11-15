import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoutinesService } from '../services/routines.service';
import { RoutineTableComponent } from '../routine-table/routine-table.component';

@Component({
  selector: 'app-carbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RoutineTableComponent],
  templateUrl: './carbox.component.html',
  styleUrls: ['./carbox.component.scss'],
})
export class CarboxComponent implements OnInit {
  routineForm: FormGroup;
  muscleGroups: any[] = [];
  availableExercises: any[] = [];
  savedRoutines: any[] = [];

  constructor(private fb: FormBuilder, private routinesService: RoutinesService) {
    this.routineForm = this.fb.group({
      muscleGroup: [''],
      exercise: [''],
      repetitions: [{ value: '', disabled: true }],
      series: [{ value: '', disabled: true }],
      restTime: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.loadMuscleGroups();

    this.routineForm.get('muscleGroup')?.valueChanges.subscribe(groupId => {
      if (groupId) this.loadExercisesForMuscleGroup(groupId);
      else this.availableExercises = [];
      this.routineForm.patchValue({ exercise: '', repetitions: '', series: '', restTime: '' });
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
      } else {
        this.routineForm.patchValue({ repetitions: '', series: '', restTime: '' });
      }
    });
  }

  loadMuscleGroups() {
    this.routinesService.getRoutineTemplates().subscribe((data: any[]) => {
      this.muscleGroups = data.map((routine: any) => ({
        id: routine.routineTemplateId,
        name: routine.routineName,
      }));
    });
  }

  loadExercisesForMuscleGroup(muscleGroupId: number) {
    this.routinesService.getExercisesByRoutineTemplateId(muscleGroupId).subscribe((data: any[]) => {
      this.availableExercises = data.map((ex: any) => ({
        id: ex.exerciseTemplateId,
        name: ex.exerciseName,
        exerciseDetails: ex.exerciseDetails, // Mantener la estructura de detalles
      }));
    });
  }

  saveRoutine() {
    const selectedExercise = this.availableExercises.find(e => e.id === +this.routineForm.value.exercise);
    const muscleGroupName = this.muscleGroups.find(g => g.id === +this.routineForm.value.muscleGroup)?.name;

    const newRoutine = {
      id: Date.now(),
      muscleGroupName: muscleGroupName || '',
      exerciseName: selectedExercise?.name || '',
      repetitions: this.routineForm.value.repetitions,
      series: this.routineForm.value.series,
      restTime: this.routineForm.value.restTime,
    };

    this.savedRoutines.push(newRoutine);
    this.routineForm.reset({ muscleGroup: '', exercise: '' });
  }
}
