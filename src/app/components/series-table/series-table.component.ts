import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, TrackByFunction } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { Series } from '../../modules/series-store';
import { DATE_FORMAT } from '../../app.tokens';

@Component({
  selector: 'app-series-table',
  templateUrl: './series-table.component.html',
  styleUrls: ['./series-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesTableComponent {
  @Input() public series: Series[];
  @Input() public sort: Sort | undefined;
  @Output() public readonly scrolledToLast: EventEmitter<void> = new EventEmitter();
  @Output() public readonly sortChange: EventEmitter<Sort> = new EventEmitter();

  constructor(@Inject(DATE_FORMAT) public dateFormat: string) {
  }

  public onScrolledToLast(): void {
    this.scrolledToLast.emit();
  }

  public onSortChange(sort: Sort): void {
    this.sortChange.emit(sort);
  }

  public trackByNameAndSeason: TrackByFunction<Series> = ({}, item) => item.name + item.season;
}
