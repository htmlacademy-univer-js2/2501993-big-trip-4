import { FilterType } from '../const';
import { isPastDate, isFutureDate, isCurrentDate } from './trip-point-date.js';

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isPastDate(tripPoint.dateTo)),
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isFutureDate(tripPoint.dateFrom)),
  [FilterType.PRESENT]: (tripPoints) => tripPoints.filter((tripPoint) => isCurrentDate(tripPoint.dateFrom, tripPoint.dateTo)),
};


export { filter };
