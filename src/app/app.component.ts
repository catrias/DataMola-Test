import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSeriesFilter } from './models';
import { AppService } from './app.service';
import { Series } from './modules/series-store/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public series$: Observable<Series[]>;
  public filters$: Observable<AppSeriesFilter>;
  public yearsFilterOptions: AppSeriesFilter['premiereYear'][];

  constructor(private appService: AppService) {
  }

  public ngOnInit(): void {
    this.yearsFilterOptions = this.appService.getYearsFilterOptions();
    console.log(this.yearsFilterOptions);
    this.series$ = this.appService.getSeriesStream();
    this.filters$ = this.appService.getFiltersStream();
    this.appService.loadNextPage();
  }

  public onFiltersChanged(newFilters: AppSeriesFilter): void {
    this.appService.updateFilters(newFilters);
  }

  public onScrolledToLast(): void {
    this.appService.loadNextPage();
  }
}
