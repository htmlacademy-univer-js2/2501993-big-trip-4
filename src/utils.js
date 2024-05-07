import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';

const humanizeTripPointDueDate = (date) => dayjs(date).format('DD MMM');

const getDaysOutput = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;

const getHoursOutput = (days, restHours) => (days <= 0 && restHours <= 0) ? '' : `${`${restHours}`.padStart(2, '0')}H`;

const getMinutesOutput = (restMinutes) => `${`${restMinutes}`.padStart(2, '0')}M`;

const getDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.trunc(difference / MINUTES_IN_DAY);
  const restHours = Math.trunc((difference - days * MINUTES_IN_DAY) / MINUTES_IN_HOUR);
  const restMinutes = difference - (days * MINUTES_IN_DAY + restHours * MINUTES_IN_HOUR);

  const daysOutput = getDaysOutput(days);
  const hoursOutput = getHoursOutput(days, restHours);
  const minutesOutput = getMinutesOutput(restMinutes);

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

const getDate = (date) => dayjs(date).format(DATE_FORMAT);

const getTime = (date) => dayjs(date).format(TIME_FORMAT);

const getDateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (elements) => {
  const MIN = 0;
  const max = elements.length - 1;
  return elements[getRandomInteger(MIN, max)];
};

const isPointDatePast = (dateTo) => dayjs().diff(dateTo, 'minute') > 0;

const isPointDateFuture = (dateFrom) => dateFrom.diff(dayjs(), 'minute') > 0;

const isPointDatePresent = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'minute') >= 0 && dateTo.diff(dayjs(), 'minute') >= 0;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const SortTypeDescription = {
  [SortType.DAY]: 'Day',
  [SortType.EVENT]: 'Event',
  [SortType.TIME]: 'Time',
  [SortType.PRICE]: 'Price',
  [SortType.OFFERS]: 'Offers',
};
const TripPointType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const TripPointTypeDescription = {
  [TripPointType.TAXI]: 'Taxi',
  [TripPointType.BUS]: 'Bus',
  [TripPointType.TRAIN]: 'Train',
  [TripPointType.SHIP]: 'Ship',
  [TripPointType.DRIVE]: 'Drive',
  [TripPointType.FLIGHT]: 'Flight',
  [TripPointType.CHECK_IN]: 'Check-in',
  [TripPointType.SIGHTSEEING]: 'Sightseeing',
  [TripPointType.RESTAURANT]: 'Restaurant'
};

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isPointDateFuture(tripPoint.dateFrom)),
  [FilterType.PRESENT]: (tripPoints) => tripPoints.filter((tripPoint) => isPointDatePresent(tripPoint.dateFrom, tripPoint.dateTo)),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isPointDatePast(tripPoint.dateTo)),
};
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

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

export { getRandomInteger, getRandomElement, humanizeTripPointDueDate, getDuration, getDate, getDateTime, getTime, filter, updateItem, sorting, SortType, SortTypeDescription, TripPointType, TripPointTypeDescription };
