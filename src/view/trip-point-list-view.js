import { createElement } from '../render';

const createTripPointListTemplate = () => (
  `<ul class="Trip-events__list">
  </ul>`
);

export default class TripPointListView {
  getTemplate () {
    return createTripPointListTemplate();
  }

  getElement() {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
