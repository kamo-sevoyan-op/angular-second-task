import {
  AfterViewInit,
  Component,
  inject,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { Column } from '../../models/column.model';
import { RulesService } from '../../services/rules.service';
import { CountryIconComponent } from './country-icon/country-icon.component';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-rules-engine',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DataTableComponent,
    CountryIconComponent,
  ],
  templateUrl: './rules-engine.component.html',
  styleUrl: './rules-engine.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RulesEngineComponent implements AfterViewInit {
  readonly headingText = 'Rules Engine';

  rulesService = inject(RulesService);
  changeDetectionReference = inject(ChangeDetectorRef);
  data = this.rulesService.getData();

  /**
   * Create reference to column templates
   */
  @ViewChild('countryIconTemplate', { static: false })
  countryIconTemplate?: TemplateRef<any>;
  @ViewChild('moduleTemplate', { static: false })
  moduleTemplate?: TemplateRef<any>;
  @ViewChild('actionsTemplate', { static: false })
  actionsTemplate?: TemplateRef<any>;

  tableColumns$ = new BehaviorSubject<Column[]>([]);

  ngAfterViewInit() {
    /**
     * Set columns
     */
    this.tableColumns$.next([
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
    this.changeDetectionReference.detectChanges();
  }
}
