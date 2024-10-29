import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule], // Añadir aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  weight: number | null = null;
  height: number | null = null;
  age: number | null = null;
  gender: string | null = null;
  imc: number | null = null;
  imcMessage: string = '';

  calculateIMC(): void {
    if (this.weight && this.height) {
      const heightInMeters = this.height / 100;
      this.imc = +(this.weight / (heightInMeters * heightInMeters)).toFixed(2);
      
      if (this.imc < 18.5) {
        this.imcMessage = 'Bajo peso';
      } else if (this.imc < 24.9) {
        this.imcMessage = 'Peso normal';
      } else if (this.imc < 29.9) {
        this.imcMessage = 'Sobrepeso';
      } else {
        this.imcMessage = 'Obesidad';
      }
    }
  }
}
