import EventsView from '../view/trip-point-list-view.js';
import TripPointView from '../view/trip-point-view.js';
import CreatingFormView from '../view/creating-form-view.js';
import EditingFormView from '../view/editing-form-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripPointPresenter {
  constructor(tripContainer) {
    this.eventsList = new EventsView();
    this.tripContainer = tripContainer;
  }

  init () {
    render(new SortView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new EditingFormView(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++){
      render(new TripPointView(), this.eventsList.getElement());
    }

    render(new CreatingFormView(), this.eventsList.getElement());
  }
}
