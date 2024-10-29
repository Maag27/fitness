import { Component } from '@angular/core';
import { CalculatorIMCComponent } from "../calculator-imc/calculator-imc.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalculatorIMCComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
