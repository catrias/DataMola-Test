export interface Series<T = string> {
  readonly name: string;
  readonly genres: T[];
  readonly season: number;
  readonly networks: string[];
  readonly premiere: number;
}
