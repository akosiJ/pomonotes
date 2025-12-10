import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './right-sidebar.html',
  styleUrls: ['./right-sidebar.css']
})
export class RightSidebarComponent {
  constructor(public dashboardService: DashboardService) {}

  // Sample data for cards
  features = [
    { 
      title: 'Studio', 
      icon: 'pi pi-play', 
      description: 'Code editor with live preview',
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      title: 'Overview', 
      icon: 'pi pi-chart-line', 
      description: 'Project statistics and metrics',
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      title: 'Quiz', 
      icon: 'pi pi-question-circle', 
      description: 'Interactive learning modules',
      color: 'bg-green-100 text-green-600'
    },
    { 
      title: 'Guide', 
      icon: 'pi pi-book', 
      description: 'Step-by-step tutorials',
      color: 'bg-amber-100 text-amber-600'
    },
    { 
      title: 'Community', 
      icon: 'pi pi-users', 
      description: 'Connect with developers',
      color: 'bg-pink-100 text-pink-600'
    },
    { 
      title: 'Settings', 
      icon: 'pi pi-cog', 
      description: 'Customize your workspace',
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  togglePane(): void {
    this.dashboardService.toggleRightPane();
  }
}