import { Component, OnInit } from '@angular/core';

import { SeriesStoreService } from './modules/series-store';
import { AppSeries } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public series: AppSeries[];
  public page = 0;
  public readonly seriesPerPage = 20;

  constructor(private seriesStoreService: SeriesStoreService<AppSeries>) {
  }

  public ngOnInit(): void {
    this.series = this.seriesStoreService.get(this.page, this.seriesPerPage);
  }

  public onScrolledToLast(): void {
    this.page += 1;
    const newSeries = this.seriesStoreService.get(this.page, this.seriesPerPage);
    this.series = [...this.series, ...newSeries];
  }
}
