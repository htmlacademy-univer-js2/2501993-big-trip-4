import { filter } from '../utils.js';

export const generateFilter = (tripPoints) => Object.entries(filter).map(
  ([filterName, filterTripPoints]) => ({
    name: filterName,
    count: filterTripPoints(tripPoints).length,
  }),
);
