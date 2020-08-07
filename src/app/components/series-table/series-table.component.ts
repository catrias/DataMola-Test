import { Component, Inject, Input, OnInit, TrackByFunction } from '@angular/core';

import { AppSeries } from '../../models';
import { DATE_FORMAT } from '../../app.tokens';

@Component({
  selector: 'app-series-table',
  templateUrl: './series-table.component.html',
  styleUrls: ['./series-table.component.scss'],
})
export class SeriesTableComponent implements OnInit {
  @Input() public series: AppSeries[];

  constructor(@Inject(DATE_FORMAT) public dateFormat: string) {
  }

  ngOnInit(): void {
  }

  public trackByNameAndSeason: TrackByFunction<AppSeries> = ({}, item) => item.name + item.season;
}
