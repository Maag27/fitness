// Importaciones necesarias desde Angular y Firebase
import { Injectable } from '@angular/core'; 
import { Firestore, collectionData, collection } from '@angular/fire/firestore'; 
import { Observable } from 'rxjs'; 

// Decorador Injectable que permite que este servicio sea inyectable en otros componentes o servicios
@Injectable({ 
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación (nivel raíz)
})
export class PhrasesService { 
  // Constructor del servicio, que inyecta la dependencia de Firestore
  constructor(private firestore: Firestore) {}

  // Método para obtener las frases desde la colección "frases" en Firestore
  getPhrases(): Observable<any[]> { 
    // Accede a la colección 'frases' dentro de Firestore
    const phrasesCollection = collection(this.firestore, 'frases'); 
    
    // Retorna un Observable que contiene los datos de la colección, incluyendo el campo 'id' para cada documento
    return collectionData(phrasesCollection, { idField: 'id' }); 
  } 
}
