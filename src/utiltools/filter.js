import { FilterType } from '../const';
import { isPointDateFuture, isPointDatePresent, isPointDatePast } from './trip-point-date';

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isPointDateFuture(tripPoint.dateFrom)),
  [FilterType.PRESENT]: (tripPoints) => tripPoints.filter((tripPoint) => isPointDatePresent(tripPoint.dateFrom, tripPoint.dateTo)),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isPointDatePast(tripPoint.dateTo)),
};

export { filter };
