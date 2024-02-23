import { createElement } from '../render';

const createRoutePointListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class RoutePointListView {
  getTemplate () {
    return createRoutePointListTemplate;
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
