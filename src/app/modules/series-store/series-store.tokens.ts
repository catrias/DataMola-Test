import { InjectionToken } from '@angular/core';

import { Series } from './models';

export const SERIES_STORE: InjectionToken<Series[]> = new InjectionToken('SERIES_STORE');
