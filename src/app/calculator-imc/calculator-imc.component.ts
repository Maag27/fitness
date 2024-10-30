import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para la gestión de formularios
import { CommonModule } from '@angular/common'; // Importa CommonModule para las directivas comunes de Angular

@Component({
  selector: 'app-calculator-imc', // Define el selector del componente
  standalone: true, // Marca el componente como independiente
  imports: [FormsModule, CommonModule], // Importa los módulos necesarios para el componente
  templateUrl: './calculator-imc.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./calculator-imc.component.scss'] // Ruta al archivo de estilos SCSS del componente
})
export class CalculatorIMCComponent {
  weight: number = 0; // Variable para almacenar el peso ingresado
  height: number = 0; // Variable para almacenar la altura ingresada
  imc: number = 0; // Variable para almacenar el valor calculado del IMC
  imcMessage: string = ""; // Variable para almacenar el mensaje correspondiente al IMC

  // Método para calcular el IMC
  calculateIMC() {
    // Verifica que el peso y la altura hayan sido ingresados
    if (this.weight && this.height) {
      // Calcula el IMC utilizando la fórmula estándar: peso (kg) / (altura (m)^2)
      this.imc = this.weight / ((this.height / 100) * (this.height / 100));
      // Llama al método para establecer el mensaje de IMC correspondiente
      this.setIMCMessage();
    }
  }

  // Método para establecer el mensaje de IMC basado en el valor calculado
  setIMCMessage() {
    // Verifica en qué rango cae el IMC calculado y establece el mensaje correspondiente
    if (this.imc < 18.5) {
      this.imcMessage = 'Bajo peso'; // IMC menor a 18.5 indica bajo peso
    } else if (this.imc >= 18.5 && this.imc < 24.9) {
      this.imcMessage = 'Peso normal'; // IMC entre 18.5 y 24.9 indica peso normal
    } else if (this.imc >= 25 && this.imc < 29.9) {
      this.imcMessage = 'Sobrepeso'; // IMC entre 25 y 29.9 indica sobrepeso
    } else {
      this.imcMessage = 'Obesidad'; // IMC mayor o igual a 30 indica obesidad
    }
  }
}
