import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const.js';

const NoTripPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createNoTripPointTemplate = (filterType) => {
  const noTripPointTextValue = NoTripPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">
    ${noTripPointTextValue}</p>`
  );
};

export default class NoTripPointView extends AbstractView{
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoTripPointTemplate(this.#filterType);
  }
}
