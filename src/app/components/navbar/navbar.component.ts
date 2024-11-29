import { Component, inject, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuClicked = output<void>();
  onMenuClicked() {
    this.menuClicked.emit();
  }

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    const name = 'app-bell-icon';
    const url = `/icons/${name}.svg`;
    iconRegistry.addSvgIcon(
      name,
      sanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }
}
