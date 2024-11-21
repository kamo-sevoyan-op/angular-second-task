import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataTableComponent } from '../../shared/data-table/data-table.component';

@Component({
  selector: 'app-rules-engine',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatButtonModule, DataTableComponent],
  templateUrl: './rules-engine.component.html',
  styleUrl: './rules-engine.component.css',
})
export class RulesEngineComponent {
  readonly headingText = 'Rules Engine';
}
