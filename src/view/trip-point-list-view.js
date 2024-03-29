import AbstractView from '../framework/view/abstract-view.js';

const createTripPointListTemplate = () => (
  `<ul class="Trip-events__list">
  </ul>`
);

export default class TripPointListView extends AbstractView {
  get template () {
    return createTripPointListTemplate();
  }
}
