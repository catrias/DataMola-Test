import { Inject, Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { SERIES_STORE } from './series-store.tokens';
import { Series, SeriesFilter, YearsRange } from './models';

@Injectable()
export class SeriesStoreService {
  constructor(@Inject(SERIES_STORE) private seriesStore: Series[]) {
  }

  public get(page: number, count: number, filters: SeriesFilter = {}, sort?: Sort): Series[] {
    const filteredSeries = this.seriesStore.filter(series => this.filterByComplexValue(series, filters));
    const sortedSeries = sort && sort.direction ? this.sortSeries(filteredSeries, sort) : filteredSeries;
    const startIndex = page * count;
    return sortedSeries.slice(startIndex, startIndex + count);
  }

  public getNetworks(): string[] {
    return [
      ...new Set(this.seriesStore.reduce((acc, series) => [...acc, ...series.networks], []))
    ];
  }

  public getYearsRange(): YearsRange {
    const sortedPremiers = this.seriesStore.map(series => series.premiere).sort((a, b) => a - b);
    return {
      startYear: new Date(sortedPremiers[0]).getUTCFullYear(),
      endYear: new Date(sortedPremiers[sortedPremiers.length - 1]).getUTCFullYear(),
    };
  }

  private filterByComplexValue(series: Series, filters: SeriesFilter): boolean {
    return this.matchByName(series.name, filters.name)
      && this.matchByGenres(series.genres, filters.genres)
      && this.matchByNetworks(series.networks, filters.networks)
      && this.matchByPremiere(series.premiere, filters.premiereFrom, filters.premiereTo);
  }

  private matchByName(name: Series['name'], filterValue: Series['name']): boolean {
    return !filterValue || name.toLowerCase().includes(filterValue.toLowerCase());
  }

  private matchByGenres(genres: Series['genres'], filterValue: Series['genres']): boolean {
    return filterValue.length === 0 || filterValue.some(filterGenre => genres.includes(filterGenre));
  }

  private matchByNetworks(networks: Series['networks'], filterValue: Series['networks']): boolean {
    return filterValue.length === 0 || filterValue.some(filterNetwork => networks.includes(filterNetwork));
  }

  private matchByPremiere(
    premiere: Series['premiere'],
    premiereFrom: Series['premiere'],
    premiereTo: Series['premiere'],
  ): boolean {
    return (!premiereFrom || premiere >= premiereFrom) && (!premiereTo || premiere <= premiereTo);
  }

  private sortSeries(series: Series[], sort: Sort): Series[] {
    const seriesCopy = series.slice();

    return seriesCopy.sort((left, right) => {
      const leftValue = left[sort.active];
      const rightValue = right[sort.active];
      const directionMultiplier = sort.direction === 'desc' ? -1 : 1;

      if (typeof leftValue === 'number' && typeof rightValue === 'number') {
        return (leftValue - rightValue) * directionMultiplier;
      }

      return leftValue.toString().localeCompare(rightValue.toString()) * directionMultiplier;
    });
  }
}
