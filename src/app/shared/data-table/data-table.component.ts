import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
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
import { CustomPaginationDirective } from '../../directives/custom-pagination.directive';
import { Column } from '../../models/column.model';
import { Observable, Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

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
    MatInputModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent<T extends { id: number }>
  implements AfterViewInit, OnInit
{
  @Input() tableColumns$!: Observable<Column[]>;
  tableColumns: Column[] = [];
  @Input() tableData: T[] = [];

  selectedColumns?: string[];

  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  identity: TrackByFunction<T> = (_, item: T) => item.id;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  subscription?: Subscription;
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);

    this.subscription = this.tableColumns$.subscribe((val) => {
      this.tableColumns = val;
      this.selectedColumns = val.map((c) => c.value);
    });

    this.destroyRef.onDestroy(() => {
      this.subscription?.unsubscribe();
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
