import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { RulesService } from '../../services/rules.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rules-engine',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatButtonModule, DataTableComponent],
  templateUrl: './rules-engine.component.html',
  styleUrl: './rules-engine.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RulesEngineComponent {
  readonly headingText = 'Rules Engine';

  rulesService = inject(RulesService);
  dataSource = new MatTableDataSource(this.rulesService.getData());

  readonly selectedColumns = ['name', 'module', 'country', 'status', 'actions'];
  readonly columnNames = [
    'Rule name',
    'Module',
    'Country',
    'Status',
    'Actions',
  ];
}
