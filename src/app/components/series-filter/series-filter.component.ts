import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TrackByFunction } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AppSeriesFilter, Genre } from '../../models';

@UntilDestroy()
@Component({
  selector: 'app-series-filter',
  templateUrl: './series-filter.component.html',
  styleUrls: ['./series-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesFilterComponent implements OnInit {
  @Input() public yearOptions: AppSeriesFilter['premiereYear'][];
  @Input() public networkOptions: AppSeriesFilter['network'][];

  @Input() public set filters(value: AppSeriesFilter) {
    this.filtersFormGroup.setValue(value, { emitEvent: false });
  }

  @Output() public filtersChanged: EventEmitter<AppSeriesFilter> = new EventEmitter();

  public filtersFormGroup: FormGroup;
  public genres: Genre[];

  constructor(private formBuilder: FormBuilder) {
    this.filtersFormGroup = this.buildFiltersForm();
  }

  ngOnInit(): void {
    this.genres = Object.values(Genre);

    this.filtersFormGroup.valueChanges.pipe(
      untilDestroyed(this),
    ).subscribe(value => this.filtersChanged.emit(value));
  }

  public trackByGenre: TrackByFunction<Genre> = ({}, genre) => genre;

  public trackByNetwork: TrackByFunction<string> = ({}, network) => network;

  public trackByYear: TrackByFunction<number> = ({}, year) => year;

  private buildFiltersForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      genre: [''],
      network: [''],
      premiereYear: [''],
    });
  }
}
