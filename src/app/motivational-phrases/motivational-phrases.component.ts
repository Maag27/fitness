// src/app/motivational-phrases/motivational-phrases.component.ts
import { Component, OnInit } from '@angular/core';
import { PhrasesService } from '../services/phrases.service';

@Component({
  selector: 'app-motivational-phrases',
  templateUrl: './motivational-phrases.component.html',
  styleUrls: ['./motivational-phrases.component.scss'],
  standalone: true,
  providers: [PhrasesService]
})
export class MotivationalPhrasesComponent implements OnInit {
  phrases: any[] = []; // Arreglo para almacenar las frases y autores obtenidos de Firestore
  currentPhrase: string = ''; // Frase actual mostrada en el componente
  currentAuthor: string = ''; // Autor actual mostrado en el componente

  constructor(private phrasesService: PhrasesService) {}

  ngOnInit(): void {
    // Obtiene las frases de Firestore al inicializar el componente
    this.phrasesService.getPhrases().subscribe(data => {
      this.phrases = data; // Almacena las frases en el arreglo
      this.selectRandomPhrase(); // Selecciona una frase inicial
    });
  }

  selectRandomPhrase(): void {
    // Selecciona una frase aleatoria de la lista de frases disponibles
    if (this.phrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.phrases.length);
      const randomPhrase = this.phrases[randomIndex];
      
      // Asigna la frase y el autor a las variables actuales
      this.currentPhrase = randomPhrase.frase; 
      this.currentAuthor = randomPhrase.Autor;
    }
  }
}
