import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './left-sidebar.html',
  styleUrls: ['./left-sidebar.css'],
})
export class LeftSidebarComponent {
  @Input() isCollapsed: boolean = false;

  constructor(public dashboardService: DashboardService, public themeService: ThemeService) {}

  // Navigation items
  navItems = [
    { icon: 'pi pi-home', label: 'Dashboard', active: true },
    { icon: 'pi pi-folder', label: 'Projects' },
    { icon: 'pi pi-file', label: 'Documents' },
    { icon: 'pi pi-calendar', label: 'Calendar' },
    { icon: 'pi pi-chart-bar', label: 'Analytics' },
    { icon: 'pi pi-cog', label: 'Settings' },
    { icon: 'pi pi-users', label: 'Team' },
    { icon: 'pi pi-question-circle', label: 'Help' },
  ];

  togglePane(): void {
    this.dashboardService.toggleLeftPane();
  }

  toggleTheme(): void {
     const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');

  }
}
