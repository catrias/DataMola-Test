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
  static withSeries(series: Series[]): ModuleWithProviders<SeriesStoreModule> {
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
