import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
@Component({
  selector: 'app-login',
  imports: [DrawerModule, CardModule, ButtonModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = signal<string | null>(null);
  loading = signal(false);

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  async signIn() {
    this.error.set(null);
    this.loading.set(true);
    try {
      await this.auth.signIn(this.email, this.password);
      // navigate to dashboard on success
      await this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Sign-in failed');
    } finally {
      this.loading.set(false);
    }
  }

  async signInWithGoogle() {
    this.error.set(null);
    this.loading.set(true);
    try {
      await this.auth.signInWithGoogle();
      await this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Google sign-in failed');
    } finally {
      this.loading.set(false);
    }
  }
}
