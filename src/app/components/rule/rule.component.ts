import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { Column } from '../../models/column.model';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RuleService } from '../../services/rule.service';
import { RulesEngineService } from '../../services/rules-engine.service';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { PageHeadingComponent } from '../../shared/page-heading/page-heading.component';

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [
    DataTableComponent,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    PageHeadingComponent
  ],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.css',
})
export class RuleComponent implements OnInit {
  /**
   * Create reference to column templates.
   */
  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate?: TemplateRef<any>;

  rulesEngineId = input.required<string>();
  ruleService = inject(RuleService);
  rulesEngineService = inject(RulesEngineService);

  data = computed(() =>
    this.ruleService.getDataByRulesEngineId(this.rulesEngineId())
  );
  tableColumns = signal<Column[]>([]);

  readonly rulesEngine = computed(() =>
    this.rulesEngineService.getDataByRulesEngineId(this.rulesEngineId())
  );
  countryName = '';
  name = computed(() => this.rulesEngine().name);
  ruleEngineExists = computed(() =>
    this.rulesEngineService.contains(this.rulesEngineId())
  );

  subscription?: Subscription;
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.tableColumns.set([
      {
        value: 'name',
        name: 'Type Name',
      },
      {
        value: 'validity',
        name: 'Validity',
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

    this.subscription = this.rulesEngineService
      .getCountryName(this.rulesEngineId())
      .subscribe({
        next: (response: any) => {
          this.countryName = response[0].name.common;
        },
        error: (error) => {
          console.log(error);
          this.countryName = 'Unknown country';
        },
      });

    this.destroyRef.onDestroy(() => {
      this.subscription?.unsubscribe();
    });
  }
}
