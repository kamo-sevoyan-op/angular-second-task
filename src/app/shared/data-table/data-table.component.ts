import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Column } from '../../models/column.model';
import { Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { LeanPaginationDirective } from '../../directives/lean-paginator.directive';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    LeanPaginationDirective,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent<T extends { id: number }>
  implements AfterViewInit, OnInit
{
  tableData = input.required<T[]>();
  tableColumns = input.required<Column[]>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  identity: TrackByFunction<T> = (_, item: T) => item.id;

  selectedColumns = computed(() => this.tableColumns().map((c) => c.value));
  dataSource = new MatTableDataSource<T>([]);

  subscription?: Subscription;
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.dataSource.data = this.tableData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
