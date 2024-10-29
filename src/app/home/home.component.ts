// src/app/home/home.component.ts

import { Component, ViewChild, ElementRef } from '@angular/core';
import { CalculatorIMCComponent } from '../calculator-imc/calculator-imc.component';
import { MotivationalPhrasesComponent } from '../motivational-phrases/motivational-phrases.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MotivationalPhrasesComponent, CalculatorIMCComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Referencias a los componentes
  @ViewChild('calculatorSection', { static: false }) calculatorSection!: ElementRef;
  @ViewChild('phrasesSection', { static: false }) phrasesSection!: ElementRef;

  // Función para navegar a la sección de destino
  navigateTo(section: string): void {
    const targetSection = section === 'calculator' ? this.calculatorSection : this.phrasesSection;
    targetSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
