import { Injectable } from '@angular/core';
import { coerceArray } from '@angular/cdk/coercion';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppSeriesFilter } from './models';
import { Series, SeriesFilter, SeriesStoreService } from './modules/series-store';

@Injectable()
export class AppService {
  private readonly series$: BehaviorSubject<Series[]> = new BehaviorSubject([]);
  private readonly filters$: BehaviorSubject<AppSeriesFilter> = new BehaviorSubject({
    name: '',
    genre: '',
    network: '',
    premiereYear: '',
  });
  private sort$: BehaviorSubject<Sort> = new BehaviorSubject(undefined);
  private page = 0;
  private seriesForPage = 20;

  constructor(private seriesStoreService: SeriesStoreService) {
  }

  public get storeFilters(): SeriesFilter {
    return this.mapToStoreFilters(this.filters$.value);
  }

  public getFiltersStream(): Observable<AppSeriesFilter> {
    return this.filters$.asObservable();
  }

  public getSortStream(): Observable<Sort> {
    return this.sort$.asObservable();
  }

  public getSeriesStream(): Observable<Series[]> {
    return this.series$.asObservable();
  }

  public getNetworksFilterOptions(): AppSeriesFilter['network'][] {
    return this.seriesStoreService.getNetworks();
  }

  public getYearsFilterOptions(): AppSeriesFilter['premiereYear'][] {
    const yearsRange = this.seriesStoreService.getYearsRange();
    return new Array(yearsRange.endYear - yearsRange.startYear + 1)
      .fill(0)
      .map(({}, index) => yearsRange.startYear + index);
  }

  public reload(): void {
    this.page = 0;
    const newSeries = this.seriesStoreService.get(this.page, this.seriesForPage, this.storeFilters, this.sort$.value);
    this.series$.next(newSeries);
  }

  public loadNextPage(): void {
    this.page += 1;
    const newSeries = this.seriesStoreService.get(this.page, this.seriesForPage, this.storeFilters, this.sort$.value);
    this.series$.next([...this.series$.value, ...newSeries]);
  }

  public updateFilters(filters: AppSeriesFilter): void {
    this.page = 0;
    this.filters$.next(filters);
    const newSeries = this.seriesStoreService.get(this.page, this.seriesForPage, this.storeFilters, this.sort$.value);
    this.series$.next(newSeries);
  }

  public updateSort(sort: Sort): void {
    this.page = 0;
    this.sort$.next(sort);
    const newSeries = this.seriesStoreService.get(this.page, this.seriesForPage, this.storeFilters, this.sort$.value);
    this.series$.next(newSeries);
  }

  private mapToStoreFilters(filters: AppSeriesFilter): SeriesFilter {
    return {
      name: filters.name,
      genres: coerceArray(filters.genre || []),
      networks: coerceArray(filters.network || []),
      premiereFrom: filters.premiereYear && +new Date(0).setUTCFullYear(filters.premiereYear),
      premiereTo: filters.premiereYear && (new Date(0).setUTCFullYear(filters.premiereYear + 1) - 1),
    };
  }
}
