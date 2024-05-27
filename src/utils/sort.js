import dayjs from 'dayjs';
import { SortType } from '../const';

const sortDayTripPoint = (tripPointA, tripPointB) => dayjs(tripPointA.dateFrom).diff(dayjs(tripPointB.dateFrom));
const sortTimeTripPoint = (tripPointA, tripPointB) => {

  const timeTripPointA = dayjs(tripPointA.dateTo).diff(dayjs(tripPointA.dateFrom));

  const timeTripPointB = dayjs(tripPointB.dateTo).diff(dayjs(tripPointB.dateFrom));

  return timeTripPointB - timeTripPointA;

};

const sortPriceTripPoint = (tripPointA, tripPointB) => tripPointB.basePrice - tripPointA.basePrice;
const sorting = {

  [SortType.DAY]: (tripPoints) => tripPoints.sort(sortDayTripPoint),

  [SortType.TIME]: (tripPoints) => tripPoints.sort(sortTimeTripPoint),

  [SortType.PRICE]: (tripPoints) => tripPoints.sort(sortPriceTripPoint),

};

export { sorting };
