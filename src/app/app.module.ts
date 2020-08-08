import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

import { GenreLabelModule } from './modules/genre-label';
import { IntersectionModule } from './modules/intersection';
import { SeriesStoreModule } from './modules/series-store';
import { generateSeries } from './init';
import { AppComponent } from './app.component';
import { APP_COMPONENTS } from './components';
import { APP_PIPES } from './pipes';
import { DATE_FORMAT } from './app.tokens';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    APP_COMPONENTS,
    APP_PIPES,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    GenreLabelModule,
    IntersectionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
    SeriesStoreModule.withSeries(generateSeries()),
  ],
  providers: [
    AppService,
    {
      provide: DATE_FORMAT,
      useValue: 'dd.MM.yyyy',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
