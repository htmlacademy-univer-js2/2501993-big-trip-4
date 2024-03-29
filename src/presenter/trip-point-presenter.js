import TripPointView from '../view/trip-point-view.js';
import EditingTripPointView from '../view/editing-trip-point-view.js';
import SortView from '../view/sort-view.js';
import { render, replace } from '../framework/render.js';

export default class TripPointPresenter {
  #tripPointsList = null;
  #tripContainer = null;
  #tripPointsModel = null;
  #tripPoints = null;
  #destinations = null;
  #offers = null;

constructor(tripContainer) {
    this.#tripPointsList = new TripPointListView();
    this.#tripContainer = tripContainer;
  }

  init (tripPointsModel) {
    this.#tripPointsModel = tripPointsModel;
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];
    this.#destinations = [...this.#tripPointsModel.destinations];
    this.#offers = [...this.#tripPointsModel.offers];

    render(new SortView(), this.#tripContainer);
    render(this.#tripPointsList, this.#tripContainer);

    for (const tripPoint of this.#tripPoints){
      this.#renderTripPoint(tripPoint);
    }

  }

  #renderTripPoint = (tripPoint) => {
    const tripPointComponent = new TripPointView(tripPoint, this.#destinations, this.#offers);
    const pointEditComponent = new EditingTripPointView(tripPoint, this.#destinations, this.#offers);

    const replaceTripPointToEditForm = () => {
      replace(pointEditComponent, tripPointComponent);
    };

    const replaceEditFormToTripPoint = () => {
      replace(tripPointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToTripPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    tripPointComponent.setEditClickHandler(() => {
      replaceTripPointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setPreviewClickHandler(() => {
      replaceEditFormToTripPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceEditFormToTripPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(tripPointComponent, this.#tripPointsList.element);
  };
}

