import { Injectable, signal } from '@angular/core';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../core/firebase';

/**
 * Simple AuthService that wraps firebase auth operations and exposes
 * a signal for the current user.
 */
@Injectable({ providedIn: 'root' })
export class Auth {
  // consumer components can read this signal to determine logged-in user
  // The signal holds `User | null` — and we expose a `ready` promise that
  // resolves once Firebase reports the initial auth state (so guards can wait).
  user = signal<User | null>(null);

  // A promise resolving after the first onAuthStateChanged event. This allows
  // route guards (or other startup logic) to wait for Firebase to restore
  // persisted sessions before making navigation decisions.
  readonly ready: Promise<void>;

  constructor() {
    // resolveReady will be called the first time onAuthStateChanged fires
    let resolveReady: () => void;
    this.ready = new Promise((resolve) => {
      resolveReady = resolve;
    });

    // keep the signal in sync with Firebase auth state and resolve the
    // ready promise on the first callback so consumers know auth is initialized
    // (persisted session restored or determined to be null).
    onAuthStateChanged(auth, (u) => {
      this.user.set(u);
      // ensure we only resolve once (resolveReady is defined above)
      if (resolveReady) {
        resolveReady();
        // overwrite resolveReady to a no-op after first call
        // @ts-ignore - allow resetting to undefined after call
        resolveReady = undefined as any;
      }
    });
  }

  get isAuthenticated(): boolean {
    return !!this.user();
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  async signOut() {
    return signOut(auth);
  }
}
