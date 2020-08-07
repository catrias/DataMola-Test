import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SeriesStoreModule } from './modules/series-store';
import { generateSeries } from './init';
import { AppComponent } from './app.component';
import { APP_COMPONENTS } from './components';
import { APP_PIPES } from './pipes';
import { DATE_FORMAT } from './app.tokens';

@NgModule({
  declarations: [
    AppComponent,
    APP_COMPONENTS,
    APP_PIPES,
  ],
  imports: [
    BrowserModule,
    SeriesStoreModule.withSeries(generateSeries()),
  ],
  providers: [
    {
      provide: DATE_FORMAT,
      useValue: 'dd.MM.yyyy',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
