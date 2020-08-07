import { Inject, Injectable } from '@angular/core';

import { SERIES_STORE } from './series-store.tokens';
import { Series } from './models';

@Injectable()
export class SeriesStoreService<T = Series> {
  constructor(@Inject(SERIES_STORE) private seriesStore: T[]) {
  }

  public get(page: number, count: number): T[] {
    const startIndex = page * count;
    return this.seriesStore.slice(startIndex, startIndex + count);
  }
}
