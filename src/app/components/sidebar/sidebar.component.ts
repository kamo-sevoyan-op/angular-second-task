import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatSidenav, RouterModule, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  navigations = [
    { name: 'Dashboard', link: '' },
    { name: 'Rules Engine', link: '/rules-engine' },
    { name: 'Accounts', link: '' },
    { name: 'Billing', link: '' },
    { name: 'User Management', link: '' },
    { name: 'Settings', link: '' },
  ];
}
