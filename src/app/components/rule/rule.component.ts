import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { Column } from '../../models/column.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RuleService } from '../../services/rule.service';
import { RulesEngineService } from '../../services/rules-engine.service';

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [DataTableComponent, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.css',
})
export class RuleComponent implements AfterViewInit, OnInit {
  readonly rulesEngine = computed(() =>
    this.rulesEngineService.getDataByRulesEngineId(this.rulesEngineId())
  );

  rulesEngineId = input.required<string>();
  ruleService = inject(RuleService);
  rulesEngineService = inject(RulesEngineService);
  changeDetectionReference = inject(ChangeDetectorRef);

  /**
   * Create reference to column templates
   */
  @ViewChild('actionsTemplate', { static: false })
  actionsTemplate?: TemplateRef<any>;

  tableColumns$ = new BehaviorSubject<Column[]>([]);
  data = computed(() =>
    this.ruleService.getDataByRulesEngineId(this.rulesEngineId())
  );

  countryName = '';
  name = computed(() => this.rulesEngine().name);
  ruleEngineExists = computed(() =>
    this.rulesEngineService.contains(this.rulesEngineId())
  );

  subscription?: Subscription;
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    this.tableColumns$.next([
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

    this.changeDetectionReference.detectChanges();
  }
}
