import { Component } from '@angular/core';
import { CalculatorIMCComponent } from "../calculator-imc/calculator-imc.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalculatorIMCComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  weight: number | null = null; // Peso del usuario
  height: number | null = null; // Altura del usuario
  age: number | null = null; // Edad del usuario
  gender: string | null = null; // Sexo del usuario
  imc: number | null = null; // Valor del IMC calculado
  imcMessage: string = ''; // Mensaje descriptivo basado en el IMC

  calculateIMC(): void {
    // Validar que se haya ingresado peso y altura
    if (this.weight !== null && this.height !== null && this.height > 0) {
      // Convertir la altura de centímetros a metros
      const heightInMeters = this.height / 100;
      // Calcular el IMC
      this.imc = +(this.weight / (heightInMeters * heightInMeters)).toFixed(2);

      // Establecer el mensaje basado en el valor del IMC
      this.imcMessage = this.getIMCMessage(this.imc);
    } else {
      this.imc = null; // Restablecer el IMC si los datos son inválidos
      this.imcMessage = 'Por favor, ingresa un peso y una altura válidos.';
    }
  }

  private getIMCMessage(imc: number | null): string {
    if (imc === null) return ''; // Si el IMC no está calculado, retornar vacío
    if (imc < 16) {
      return 'Delgadez severa';
    } else if (imc >= 16 && imc < 16.9) {
      return 'Delgadez moderada';
    } else if (imc >= 17 && imc < 18.4) {
      return 'Delgadez leve';
    } else if (imc >= 18.5 && imc < 24.9) {
      return 'Peso normal';
    } else if (imc >= 25 && imc < 29.9) {
      return 'Sobrepeso';
    } else if (imc >= 30 && imc < 34.9) {
      return 'Obesidad tipo 1';
    } else if (imc >= 35 && imc < 39.9) {
      return 'Obesidad tipo 2';
    } else {
      return 'Obesidad tipo 3 (mórbida)';
    }
  }
}
