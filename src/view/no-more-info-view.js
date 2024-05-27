import AbstractView from '../framework/view/abstract-view.js';

const createNoMoreInfoTemplate = () => (
  `<p class="trip-events__msg">
  Failed to load latest route information
  </p>`);

export default class NoMoreInfoView extends AbstractView {
  get template() {
    return createNoMoreInfoTemplate();
  }
}
