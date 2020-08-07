import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SeriesStoreModule } from './modules/series-store';
import { generateSeries } from './init';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SeriesStoreModule.withSeries(generateSeries()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
