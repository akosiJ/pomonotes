import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Theme state with BehaviorSubject for reactivity
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false);

  // Public observable
  isDarkTheme$ = this.isDarkThemeSubject.asObservable();

  // Getter method for current value
  get isDarkTheme(): boolean {
    return this.isDarkThemeSubject.value;
  }

  // Setter method
  set isDarkTheme(value: boolean) {
    this.isDarkThemeSubject.next(value);
    // Persist to localStorage
    localStorage.setItem('themePreference', value ? 'dark' : 'light');
  }

  constructor() {
    // Initialize from localStorage
    const savedTheme = localStorage.getItem('themePreference');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme: saved preference > system preference > default (light)
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else if (prefersDark) {
      this.isDarkTheme = true;
    } else {
      this.isDarkTheme = false;
    }
  }

  // Toggle method
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }

  // Apply theme to document
  applyTheme(): void {
    if (this.isDarkTheme) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }
}
