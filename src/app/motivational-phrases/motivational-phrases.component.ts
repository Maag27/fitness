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
  phrases: any[] = [];
  currentPhrase: string = '';

  constructor(private phrasesService: PhrasesService) {}

  ngOnInit(): void {
    this.phrasesService.getPhrases().subscribe(data => {
      this.phrases = data;
      this.selectRandomPhrase(); // Selecciona una frase inicial
    });
  }

  selectRandomPhrase(): void {
    if (this.phrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.phrases.length);
      this.currentPhrase = this.phrases[randomIndex].text;
    }
  }
}
