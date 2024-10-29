import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-calculator-imc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator-imc.component.html',
  styleUrls: ['./calculator-imc.component.scss']
})
export class CalculatorIMCComponent {
  weight: number = 0;
  height: number = 0;
  imc: number = 0;
  imcMessage: string = "";

  calculateIMC() {
    if (this.weight && this.height) {
      this.imc = this.weight / ((this.height / 100) * (this.height / 100));
      this.setIMCMessage();
    }
  }

  setIMCMessage() {
    if (this.imc < 18.5) {
      this.imcMessage = 'Bajo peso';
    } else if (this.imc >= 18.5 && this.imc < 24.9) {
      this.imcMessage = 'Peso normal';
    } else if (this.imc >= 25 && this.imc < 29.9) {
      this.imcMessage = 'Sobrepeso';
    } else {
      this.imcMessage = 'Obesidad';
    }
  }
}
