import { Component, inject, input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatSidenav,
    RouterModule,
    RouterOutlet,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  toggled = input.required<boolean>();

  navigations = [
    { name: 'Dashboard', link: '', iconName: 'app-dashboard-icon' },
    {
      name: 'Rules Engine',
      link: '/rules-engine',
      iconName: 'app-rules_engine-icon',
    },
    { name: 'Accounts', link: '', iconName: 'app-accounts-icon' },
    { name: 'Billing', link: '', iconName: 'app-billing-icon' },
    {
      name: 'User Management',
      link: '',
      iconName: 'app-user_management-icon',
    },
    { name: 'Settings', link: '', iconName: 'app-settings-icon' },
  ];

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    for (const navigation of this.navigations) {
      const url = `/icons/${navigation.iconName}.svg`;
      console.log(url);
      iconRegistry.addSvgIcon(
        navigation.iconName,
        sanitizer.bypassSecurityTrustResourceUrl(url)
      );
    }
  }
}
