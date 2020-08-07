import { Series } from '../modules/series-store';
import { Genre } from './genre';

export interface AppSeriesFilter {
  name?: Series['name'];
  genre?: Genre | '';
  premiereYear?: number | '';
}
