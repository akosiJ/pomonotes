import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule, DrawerModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  drawerVisibleLeft: boolean = true;
  drawerVisibleRight: boolean = true;
}
