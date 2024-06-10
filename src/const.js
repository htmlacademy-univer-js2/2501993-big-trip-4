const AUTHORIZATION = 'Basic hIfpbpd204ffg4hf6';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';


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

const UserAction = {
  UPDATE_TRIP_POINT: 'UPDATE_TRIP_POINT',
  ADD_TRIP_POINT: 'ADD_TRIP_POINT',
  DELETE_TRIP_POINT: 'DELETE_TRIP_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const ApiServiceResponseMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export { SortType, SortTypeDescription, TripPointType, TripPointTypeDescription,
  UserAction, UpdateType, FilterType, ApiServiceResponseMethod, AUTHORIZATION, END_POINT, TimeLimit };
