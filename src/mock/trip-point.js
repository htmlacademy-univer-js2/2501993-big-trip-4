import dayjs from 'dayjs';
import { getRandomInteger, getRandomElement } from '../utils.js';
import {TRIP_POINTS_COUNT, TYPES, DESTINATION, DESCRIPTIONS, ElementsCount, PictureNumber, Price} from '../const.js';

const generateDescription = () => {
  let description = '';
  for (let i = 0; i < getRandomInteger(ElementsCount.MIN, ElementsCount.MAX); i++) {
    description += `${getRandomElement(DESCRIPTIONS)}`;
  }
  return description;
};

const generatePicture = () => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInteger(PictureNumber.MIN, PictureNumber.MAX)}`,
  description: generateDescription(),
});

const generateDestination = (id) => ({
  id,
  description: generateDescription(),
  name: DESTINATION[id],
  pictures: Array.from({length: getRandomInteger(ElementsCount.MIN, ElementsCount.MAX)}, generatePicture),
});

const getDestinations = () => Array.from({length: DESTINATION.length}).map((_, index) => generateDestination(index));

const generateOffer = (id, tripPointType) => ({
  id,
  title: `offer for ${tripPointType}`,
  price: getRandomInteger(Price.MIN, Price.MAX)
});

const generateOffersByType = (tripPointType) => ({
  type: tripPointType,
  offers: Array.from({length: getRandomInteger(ElementsCount.MIN, ElementsCount.MAX)}).map((_, index) => generateOffer(index + 1, tripPointType
  )),
});

const getOffersByType = () => Array.from({length: TYPES.length}).map((_, index) => generateOffersByType(TYPES[index]));

const offersByType = getOffersByType();
const destinations = getDestinations();

const generateTripPoint = () => {
  const offersByTypeTripPoint = getRandomElement(offersByType);
  const allOfferIdsByTypeTripPoint = offersByTypeTripPoint.offers.map((offer) => offer.id);
  return {
    basePrice: getRandomInteger(Price.MIN, Price.MAX),
    dateFrom: dayjs().add(getRandomInteger(-3, -1), 'day').add(getRandomInteger(-2, 0), 'hour').add(getRandomInteger(-59, 0), 'minute'),
    dateTo: dayjs().add(getRandomInteger(-1, 2), 'day').add(getRandomInteger(0, 2), 'hour').add(getRandomInteger(0, 59), 'minute'),
    destinationId: getRandomElement(destinations).id,
    id:crypto.randomUUID(),
    isFavorite: Boolean(getRandomInteger()),
    offerIds: Array.from({length: getRandomInteger(0, allOfferIdsByTypeTripPoint.length)}).map(() => allOfferIdsByTypeTripPoint[getRandomInteger(0, allOfferIdsByTypeTripPoint.length - 1)]),
    type: offersByTypeTripPoint.type,
  };
};

const getTripPoints = () => Array.from({length: TRIP_POINTS_COUNT}).map(() => generateTripPoint()).sort();;

export { getTripPoints, getDestinations, getOffersByType };
