import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-carbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Agrega CommonModule aquí
  templateUrl: './carbox.component.html',
  styleUrls: ['./carbox.component.scss'],
})
export class CarboxComponent {
  routineForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.routineForm = this.fb.group({
      name: [''],
      muscleGroup: [''],
      exercises: this.fb.array([])
    });
  }

  get exercises(): FormArray {
    return this.routineForm.get('exercises') as FormArray;
  }

  addExercise() {
    const exerciseForm = this.fb.group({
      name: [''],
      time: [''],
      repetitions: [''],
      warmup: ['']
    });
    this.exercises.push(exerciseForm);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  saveRoutine() {
    const routineData = this.routineForm.value;
    console.log('Routine created:', routineData);
    alert('Rutina creada correctamente');
    this.routineForm.reset();
  }
}
