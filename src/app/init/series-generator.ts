import { GENERATOR_CONFIG, NETWORKS, SERIES } from './config';
import { AppSeries, Genre } from '../models';

const getRandomArbitrary = (min, max) => Math.ceil(Math.random() * (max - min) + min);

const getRandomValuesFromArray = (array, count) => array.slice()
  .sort(() => .5 - Math.random())
  .slice(0, count);

export function generateSeries(): AppSeries[] {
  return SERIES.reduce((acc, seriesName) => {
    const networks = getRandomValuesFromArray(NETWORKS, GENERATOR_CONFIG.networksCount);
    const genres = getRandomValuesFromArray(Object.values(Genre), GENERATOR_CONFIG.genresCount);
    const seasons = [...Array(GENERATOR_CONFIG.seasonsCount).keys()].map(season => ++season);
    const series = seasons.map(season => {
      const premiere = getRandomArbitrary(GENERATOR_CONFIG.yearStart, GENERATOR_CONFIG.yearEnd);
      return {
        genres,
        networks,
        premiere,
        season,
        name: seriesName,
      };
    });

    return [...acc, ...series];
  }, []);
}
