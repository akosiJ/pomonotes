/**
 * Firebase initialization for the app.
 * Uses values from `src/environments/environment.ts`.
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';

const firebaseApp = initializeApp(environment.firebase);

export const firebase = firebaseApp;
export const auth = getAuth(firebaseApp);
