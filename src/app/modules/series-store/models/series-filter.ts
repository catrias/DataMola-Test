import { Series } from './series';

export interface SeriesFilter {
  name?: Series['name'];
  genres?: Series['genres'];
  networks?: Series['networks'];
  premiereFrom?: Series['premiere'];
  premiereTo?: Series['premiere'];
}
