import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('pomonotes');

  constructor() {}

  ngOnInit(): void {
    // Apply the theme when the app initializes
  }
}
