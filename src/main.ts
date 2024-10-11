// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth'; 
import { environment } from './environments/environment';
import { appRoutes } from './app/app.routes';  // Importa las rutas

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule),
    provideRouter(appRoutes),  // Aquí es donde usas appRoutes
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),  // Proveedor para el servicio de Auth
  ],
}).catch(err => console.error(err));
