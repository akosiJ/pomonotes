import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // State properties with BehaviorSubject for reactivity
  private isLeftPaneCollapsedSubject = new BehaviorSubject<boolean>(false);
  private isRightPaneCollapsedSubject = new BehaviorSubject<boolean>(true);
  private isLeftPaneVisibleSubject = new BehaviorSubject<boolean>(false);
  private isRightPaneVisibleSubject = new BehaviorSubject<boolean>(false);
  private isMobileViewSubject = new BehaviorSubject<boolean>(false);

  // Public observables
  isLeftPaneCollapsed$ = this.isLeftPaneCollapsedSubject.asObservable();
  isRightPaneCollapsed$ = this.isRightPaneCollapsedSubject.asObservable();
  isLeftPaneVisible$ = this.isLeftPaneVisibleSubject.asObservable();
  isRightPaneVisible$ = this.isRightPaneVisibleSubject.asObservable();
  isMobileView$ = this.isMobileViewSubject.asObservable();

  // Getter methods for current values
  get isLeftPaneCollapsed(): boolean {
    return this.isLeftPaneCollapsedSubject.value;
  }

  get isRightPaneCollapsed(): boolean {
    return this.isRightPaneCollapsedSubject.value;
  }

  get isLeftPaneVisible(): boolean {
    return this.isLeftPaneVisibleSubject.value;
  }

  get isRightPaneVisible(): boolean {
    return this.isRightPaneVisibleSubject.value;
  }

  get isMobileView(): boolean {
    return this.isMobileViewSubject.value;
  }

  // Setter methods
  set isLeftPaneCollapsed(value: boolean) {
    this.isLeftPaneCollapsedSubject.next(value);
  }

  set isRightPaneCollapsed(value: boolean) {
    this.isRightPaneCollapsedSubject.next(value);
  }

  set isLeftPaneVisible(value: boolean) {
    this.isLeftPaneVisibleSubject.next(value);
  }

  set isRightPaneVisible(value: boolean) {
    this.isRightPaneVisibleSubject.next(value);
  }

  set isMobileView(value: boolean) {
    this.isMobileViewSubject.next(value);
  }

  // Toggle methods
  toggleLeftPane(): void {
    if (this.isMobileView) {
      // In mobile view, toggle visibility
      this.isLeftPaneVisible = !this.isLeftPaneVisible;
    } else {
      // In desktop view, toggle collapsed state
      this.isLeftPaneCollapsed = !this.isLeftPaneCollapsed;
    }
  }

  toggleRightPane(): void {
    if (this.isMobileView) {
      // In mobile view, toggle visibility
      this.isRightPaneVisible = !this.isRightPaneVisible;
    } else {
      // In desktop view, toggle collapsed state
      this.isRightPaneCollapsed = !this.isRightPaneCollapsed;
    }
  }

  // Method to hide both panes (used during mobile-to-desktop transition)
  hideMobilePanes(): void {
    this.isLeftPaneVisible = false;
    this.isRightPaneVisible = false;
  }
}