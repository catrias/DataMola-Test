import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { coerceArray } from '@angular/cdk/coercion';

import { AppSeriesFilter } from './models';
import { Series, SeriesFilter, SeriesStoreService } from './modules/series-store';

@Injectable()
export class AppService {
  private readonly series$: BehaviorSubject<Series[]> = new BehaviorSubject([]);
  private readonly filters$: BehaviorSubject<AppSeriesFilter> = new BehaviorSubject({
    name: '',
    genre: '',
    premiereYear: '',
  });
  private page = 0;
  private seriesForPage = 20;

  constructor(private seriesStoreService: SeriesStoreService) {
  }

  public getFiltersStream(): Observable<AppSeriesFilter> {
    return this.filters$.asObservable();
  }

  public getSeriesStream(): Observable<Series[]> {
    return this.series$.asObservable();
  }

  public getYearsFilterOptions(): AppSeriesFilter['premiereYear'][] {
    const yearsRange = this.seriesStoreService.getYearsRange();
    return new Array(yearsRange.endYear - yearsRange.startYear + 1)
      .fill(0)
      .map(({}, index) => yearsRange.startYear + index);
  }

  public loadNextPage(): void {
    this.page += 1;
    const newSeries = this.seriesStoreService.get(this.page, this.seriesForPage, this.mapToStoreFilters(this.filters$.value));
    this.series$.next([...this.series$.value, ...newSeries]);
  }

  public updateFilters(filters: AppSeriesFilter): void {
    this.page = 0;
    this.filters$.next(filters);
    const newSeries = this.seriesStoreService.get(this.page, this.seriesForPage, this.mapToStoreFilters(this.filters$.value));
    this.series$.next(newSeries);
  }

  private mapToStoreFilters(filters: AppSeriesFilter): SeriesFilter {
    return {
      name: filters.name,
      genres: coerceArray(filters.genre || []),
      premiereFrom: filters.premiereYear && +new Date(0).setUTCFullYear(filters.premiereYear),
      premiereTo: filters.premiereYear && (new Date(0).setUTCFullYear(filters.premiereYear + 1) - 1),
    };
  }
}
