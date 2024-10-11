import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// Importa los módulos de Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Inicializa Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

// Bootstrap de la aplicación
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
