import { Genre } from '../../models';

export const GENRE_LABEL_COLOR: Record<Genre, string> = {
  [Genre.Adventure]: 'red',
  [Genre.Comedy]: 'purple',
  [Genre.Crime]: 'blue',
  [Genre.Drama]: 'green',
  [Genre.Fantasy]: 'deeppink',
  [Genre.Horror]: 'brown',
  [Genre.Romance]: 'orange',
  [Genre.Tragedy]: 'gold',
};
