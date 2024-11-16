import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorIMCComponent } from "../calculator-imc/calculator-imc.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MotivationalPhrasesComponent } from '../motivational-phrases/motivational-phrases.component';
import { CarboxComponent } from '../carbox/carbox.component';
import { MetricsService } from '../services/metrics.service';
import { RoutineTableComponent } from '../routine-table/routine-table.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CalculatorIMCComponent,
    FormsModule,
    MotivationalPhrasesComponent,
    CarboxComponent,
    RoutineTableComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  savedRoutines: any[] = []; // Rutinas guardadas
  nombre: string = '';
  apellido: string = '';
  edad: number = 0;
  altura: number = 0;
  peso: number = 0;
  estadisticas: any;
  isEditing: boolean = false;

  constructor(private metricsService: MetricsService, private authService: AuthService) {}

  // Método para recibir nuevas rutinas desde CarboxComponent
  onRoutineCreated(routine: any) {
    this.savedRoutines = [...this.savedRoutines, routine]; // Añadir nueva rutina creando un nuevo array
  }

  // Método para eliminar una rutina usando su ID
  onDeleteRoutine(routineId: number) {
    this.savedRoutines = this.savedRoutines.filter(routine => routine.id !== routineId);
  }

  ngOnInit(): void {
    this.loadUserMetrics();
  }

  // Cargar métricas del usuario autenticado
  loadUserMetrics(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }

    this.metricsService.getUserMetrics(userId).subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          const metrics = data[0];
          this.nombre = metrics.nombre || '';
          this.apellido = metrics.apellido || '';
          this.edad = metrics.edad || 0;
          this.altura = metrics.altura || 0;
          this.peso = metrics.peso || 0;
          this.estadisticas = data;
        } else {
          console.warn('No se encontraron métricas para el usuario.');
        }
      },
      (error: any) => console.error('Error al cargar las métricas:', error)
    );
  }

  // Guardar o actualizar métricas
  saveUserMetrics(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }

    const userMetric = {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      altura: this.altura,
      peso: this.peso,
    };

    this.metricsService.addUserMetric(userId, userMetric).subscribe(
      () => {
        this.loadUserMetrics();
        this.isEditing = false;
      },
      (error: any) => console.error('Error al guardar métricas:', error)
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  onSubmit(): void {
    this.saveUserMetrics();
  }
}
