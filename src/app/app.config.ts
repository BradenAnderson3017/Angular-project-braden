import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { environment } from '../environments/environment';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig),
    ]),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
