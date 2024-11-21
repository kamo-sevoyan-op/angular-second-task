import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RulesService } from '../../services/rules.service';
import { CommonModule } from '@angular/common';
import { CustomPaginationDirective } from '../../directives/custom-pagination.directive';
import { Rule } from '../../models/rule.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    CustomPaginationDirective,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements AfterViewInit {
  rulesService = inject(RulesService);
  dataSource = new MatTableDataSource(this.rulesService.getData());
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  readonly selectedColumns = ['name', 'module', 'country', 'status', 'actions'];

  readonly columnNames = [
    'Rule name',
    'Module',
    'Country',
    'Status',
    'Actions',
  ];

  identity: TrackByFunction<Rule> = (_, item: Rule) => item.id;

  constructor() {
    this.paginator = new MatPaginator(
      new MatPaginatorIntl(),
      ChangeDetectorRef.prototype
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  /**
   * Create URL from given URL template.
   * @param coutryCode Two letter code for country.
   * @param size The size of the fetched image.
   * @returns Constructed URL with country code and size.
   */
  getImageUrl(coutryCode: string, size: number = 32) {
    const url = `https://flagsapi.com/${coutryCode}/flat/${size}.png`;
    return url;
  }
}
