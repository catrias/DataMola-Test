import { Genre } from './genre';

export interface Series {
  readonly name: string;
  readonly genres: Genre[];
  readonly season: number;
  readonly networks: string[];
  readonly premiere: number;
}
