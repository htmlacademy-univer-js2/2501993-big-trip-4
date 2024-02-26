import { createElement } from '../render';

const createtripPointListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class tripPointListView {
  getTemplate () {
    return createtripPointListTemplate;
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
