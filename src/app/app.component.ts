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

  constructor(private seriesStoreService: SeriesStoreService<AppSeries>) {
  }

  public ngOnInit(): void {
    this.series = this.seriesStoreService.getAll();
  }
}
