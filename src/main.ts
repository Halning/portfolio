import {
  enableProdMode,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection, provideZoneChangeDetection,
} from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import {provideRouter, withComponentInputBinding} from "@angular/router";
import {provideHttpClient, withFetch} from "@angular/common/http";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule),
    // provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
  ],
}).catch((err) => console.error(err));
