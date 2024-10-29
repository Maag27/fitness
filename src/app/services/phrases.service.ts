// src/app/services/phrases.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhrasesService {
  constructor(private firestore: Firestore) {}

  getPhrases(): Observable<any[]> {
    const phrasesCollection = collection(this.firestore, 'frases');
    return collectionData(phrasesCollection, { idField: 'id' });
  }
}
