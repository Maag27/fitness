// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

// Inicialización de la aplicación Angular
bootstrapApplication(AppComponent, {
  providers: [
    // Configuración del HttpClient sin el módulo obsoleto HttpClientModule
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    // Proveedores necesarios para Firebase y autenticación
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Proveedor de Firebase
    provideAuth(() => getAuth()), // Proveedor de Auth para autenticación
    provideFirestore(() => getFirestore()), // Proveedor de Firestore

    // Otros proveedores
    importProvidersFrom(FormsModule), // Proveedor de FormsModule
    provideRouter(appRoutes), // Rutas de la aplicación
  ],
}).catch(err => console.error(err)); // Manejo de errores de inicialización
