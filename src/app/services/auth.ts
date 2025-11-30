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
  user = signal<User | null>(null);

  constructor() {
    // keep the signal in sync with Firebase auth state
    onAuthStateChanged(auth, (u) => this.user.set(u));
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
