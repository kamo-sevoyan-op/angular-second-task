import {
  Component,
  inject,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { Column } from '../../models/column.model';
import { RulesEngineService } from '../../services/rules-engine.service';
import { CountryIconComponent } from './country-icon/country-icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageHeadingComponent } from '../../shared/page-heading/page-heading.component';

@Component({
  selector: 'app-rules-engine',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    DataTableComponent,
    CountryIconComponent,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MatInputModule,
    PageHeadingComponent,
  ],
  templateUrl: './rules-engine.component.html',
  styleUrl: './rules-engine.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RulesEngineComponent implements OnInit {
  /**
   * Create reference to column templates.
   */
  @ViewChild('countryIconTemplate', { static: true })
  countryIconTemplate!: TemplateRef<HTMLElement>;
  @ViewChild('moduleTemplate', { static: true })
  moduleTemplate!: TemplateRef<HTMLElement>;
  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate!: TemplateRef<HTMLElement>;

  rulesEngineService = inject(RulesEngineService);
  data = this.rulesEngineService.getData();
  tableColumns = signal<Column[]>([]);
  readonly headingText = 'Rules Engine';

  ngOnInit() {
    this.tableColumns.set([
      {
        value: 'name',
        name: 'Rule name',
      },
      {
        value: 'module',
        name: 'Module',
        template: this.moduleTemplate,
      },
      {
        value: 'country',
        name: 'Country',
        template: this.countryIconTemplate,
      },
      {
        value: 'status',
        name: 'Status',
      },
      {
        value: 'actions',
        name: 'Actions',
        template: this.actionsTemplate,
      },
    ]);
  }
}
