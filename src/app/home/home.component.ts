import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorIMCComponent } from "../calculator-imc/calculator-imc.component";
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MotivationalPhrasesComponent } from '../motivational-phrases/motivational-phrases.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CalculatorIMCComponent,
    FormsModule,
    MotivationalPhrasesComponent
  ],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  edad: number = 0;
  altura: number = 0;
  peso: number = 0;
  estadisticas: any;
  isEditing: boolean = false; // Variable para manejar el estado de edición

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    // Cargar las estadísticas del usuario al iniciar el componente
    this.loadUserMetrics();
  }

  // Método para cargar métricas del usuario autenticado
  loadUserMetrics(): void {
    console.log('Cargando métricas del usuario...');

    this.apiService.getUserMetrics().subscribe(
      (data: any) => {
        console.log('Métricas del usuario recibidas:', data);
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
      (error: any) => {
        console.error('Error al cargar las métricas del usuario:', error);
      }
    );
  }

  // Método para agregar o actualizar los datos del usuario
  saveUserMetrics(): void {
    const userMetric = {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      altura: this.altura,
      peso: this.peso
    };

    console.log('Guardando métricas del usuario:', userMetric);

    this.apiService.addUserMetric(userMetric).subscribe(
      (response: any) => {
        console.log('Datos del usuario actualizados:', response);
        this.loadUserMetrics();
        this.isEditing = false; // Desactivar modo de edición después de guardar
      },
      (error: any) => {
        console.error('Error al actualizar datos del usuario:', error);
      }
    );
  }

  // Método para obtener estadísticas adicionales del usuario
  getUserStatistics(): void {
    console.log('Obteniendo estadísticas del usuario:', this.nombre, this.apellido);

    this.apiService.getUserStatistics(this.nombre, this.apellido).subscribe(
      (data: any) => {
        console.log('Estadísticas del usuario recibidas:', data);
        this.estadisticas = data;
      },
      (error: any) => {
        console.error('Error al obtener estadísticas del usuario:', error);
      }
    );
  }

  // Método para manejar la activación del modo de edición
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    console.log(this.isEditing ? 'Modo edición activado' : 'Modo edición desactivado');
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    this.saveUserMetrics();
  }
}
