import { Series } from './series';

export interface SeriesFilter {
  name?: Series['name'];
  genres?: Series['genres'];
  premiereFrom?: Series['premiere'];
  premiereTo?: Series['premiere'];
}
