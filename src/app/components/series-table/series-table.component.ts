import { Component, EventEmitter, Inject, Input, Output, TrackByFunction } from '@angular/core';

import { AppSeries } from '../../models';
import { DATE_FORMAT } from '../../app.tokens';

@Component({
  selector: 'app-series-table',
  templateUrl: './series-table.component.html',
  styleUrls: ['./series-table.component.scss'],
})
export class SeriesTableComponent {
  @Input() public series: AppSeries[];
  @Output() public readonly scrolledToLast: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(DATE_FORMAT) public dateFormat: string) {
  }

  public onScrolledToLast(): void {
    this.scrolledToLast.emit();
  }

  public trackByNameAndSeason: TrackByFunction<AppSeries> = ({}, item) => item.name + item.season;
}
