import { ModuleWithProviders, NgModule } from '@angular/core';

import { Series } from './models';
import { SeriesStoreService } from './series-store.service';
import { SERIES_STORE } from './series-store.tokens';

@NgModule({
  providers: [
    SeriesStoreService,
  ],
})
export class SeriesStoreModule {
  static withSeries<T extends Series>(series: T[]): ModuleWithProviders<SeriesStoreModule> {
    return {
      ngModule: SeriesStoreModule,
      providers: [
        {
          provide: SERIES_STORE,
          useValue: series,
        },
      ],
    };
  }
}
