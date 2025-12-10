import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar';
import { MainContentComponent } from './main-content/main-content';
import { RightSidebarComponent } from './right-sidebar/right-sidebar';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    LeftSidebarComponent,
    MainContentComponent,
    RightSidebarComponent,
    DrawerModule,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class Dashboard implements OnInit, OnDestroy {
  // State variables
  isLeftPaneCollapsed = false;
  isRightPaneCollapsed = true;
  isLeftPaneVisible = false;
  isRightPaneVisible = false;
  isMobile = false;
  
  // Breakpoint for mobile view
  private readonly MOBILE_BREAKPOINT = 1024;
  
  // Previous mobile state to detect transitions
  private previousIsMobile = false;
  
  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    public dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    // Subscribe to all service observables
    this.subscriptions.push(
      this.dashboardService.isLeftPaneCollapsed$.subscribe(
        value => this.isLeftPaneCollapsed = value
      ),
      this.dashboardService.isRightPaneCollapsed$.subscribe(
        value => this.isRightPaneCollapsed = value
      ),
      this.dashboardService.isLeftPaneVisible$.subscribe(
        value => this.isLeftPaneVisible = value
      ),
      this.dashboardService.isRightPaneVisible$.subscribe(
        value => this.isRightPaneVisible = value
      ),
      this.dashboardService.isMobileView$.subscribe(
        value => this.isMobile = value
      )
    );

    // Initial view check
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobileView(window.innerWidth);
      this.previousIsMobile = this.isMobile;
    }
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobileView((event.target as Window).innerWidth);
    }
  }

  checkMobileView(width: number): void {
    const wasMobile = this.isMobile;
    const isNowMobile = width < this.MOBILE_BREAKPOINT;
    
    // Update mobile state in service
    this.dashboardService.isMobileView = isNowMobile;
    
    // CRITICAL: Handle transition from mobile to desktop
    if (wasMobile && !isNowMobile) {
      // Transitioning FROM mobile TO desktop
      this.dashboardService.hideMobilePanes();
      // Reset pane states for desktop
      this.dashboardService.isLeftPaneCollapsed = false;
      this.dashboardService.isRightPaneCollapsed = true;
    } else if (!wasMobile && isNowMobile) {
      // Transitioning FROM desktop TO mobile
      // Collapse both panes in mobile view
      this.dashboardService.isLeftPaneCollapsed = false;
      this.dashboardService.isRightPaneCollapsed = false;
    }
    
    // Update previous state
    this.previousIsMobile = isNowMobile;
  }

  // Helper methods for mobile view
  showLeftPaneMobile(): void {
    this.dashboardService.isLeftPaneVisible = true;
  }

  showRightPaneMobile(): void {
    this.dashboardService.isRightPaneVisible = true;
  }
}

