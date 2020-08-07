import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, TrackByFunction } from '@angular/core';

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
  @Output() public readonly scrolledToLast: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(DATE_FORMAT) public dateFormat: string) {
  }

  public onScrolledToLast(): void {
    this.scrolledToLast.emit();
  }

  public trackByNameAndSeason: TrackByFunction<Series> = ({}, item) => item.name + item.season;
}
