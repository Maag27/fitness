// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, AuthModule } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    importProvidersFrom(HttpClientModule), // Agregar HttpClientModule explícitamente
    importProvidersFrom(FormsModule),
    importProvidersFrom(AuthModule),
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
}).catch(err => console.error(err));
