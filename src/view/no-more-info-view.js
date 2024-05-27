import AbstractView from '../framework/view/abstract-view.js';

const createNoAdditionalInfoTemplate = () => (
  `<p class="trip-events__msg">
  Failed to load latest route information
  </p>`);

export default class NoAdditionalInfoView extends AbstractView {
  get template() {
    return createNoAdditionalInfoTemplate();
  }
}
