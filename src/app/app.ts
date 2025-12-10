import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('pomonotes');

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Apply the theme when the app initializes
    this.themeService.applyTheme();
  }
}
