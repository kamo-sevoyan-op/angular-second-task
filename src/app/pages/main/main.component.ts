import { Component, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainpageComponent {

  sidebarToggled = signal<boolean>(false);

  chageSidebarState(){
    this.sidebarToggled.update(x => !x);
  }
}
