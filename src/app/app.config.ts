import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
import { environment } from '../environments/environment.development';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { SpinnerComponent } from './spinner/spinner.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    SpinnerComponent,
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
    ]),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebaseConfig,
    },
  ],
};
