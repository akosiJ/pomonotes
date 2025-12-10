import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule],
  templateUrl: './main-content.html',
  styleUrls: ['./main-content.css']
})
export class MainContentComponent {
  // Sample data
  documents = [
    { name: 'project-specs.pdf', size: '2.4 MB', updated: 'Today' },
    { name: 'wireframes.fig', size: '5.1 MB', updated: 'Yesterday' },
    { name: 'api-docs.md', size: '0.8 MB', updated: '2 days ago' },
    { name: 'meeting-notes.txt', size: '0.2 MB', updated: '1 week ago' }
  ];

  // Current note content
  noteContent = `# Welcome to Your Dashboard

This is your main workspace where you can organize your projects, take notes, and manage your development workflow.

## Today's Tasks
- [x] Review pull requests
- [ ] Implement new feature
- [ ] Write unit tests
- [ ] Update documentation

## Notes
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;
}