import { Inject, Injectable } from '@angular/core';

import { SERIES_STORE } from './series-store.tokens';
import { Series } from './models';

@Injectable()
export class SeriesStoreService<T = Series> {
  constructor(@Inject(SERIES_STORE) private seriesStore: T[]) {
  }

  public getAll(): T[] {
    return this.seriesStore.slice();
  }
}
