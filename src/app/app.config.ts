import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyCX9wkhFQwVs9-0hqGjphajWN885m68tGc",
  authDomain: "sposhu-8be4a.firebaseapp.com",
  databaseURL: "https://sposhu-8be4a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sposhu-8be4a",
  storageBucket: "sposhu-8be4a.appspot.com",
  messagingSenderId: "477476781435",
  appId: "1:477476781435:web:3bd208af67d4b6ffb6d1de",
  measurementId: "G-BXYZNPZY1C"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
};


