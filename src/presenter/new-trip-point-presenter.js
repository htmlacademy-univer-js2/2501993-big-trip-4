import { render, remove, RenderPosition } from '../framework/render.js';
import EditingTripPointView from '../view/editing-trip-point-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewTripPointPresenter {
  #tripPointsList = null;
  #editingTripPointComponent = null;
  #changeData = null;
  #destroyCallback = null;
  #tripPointsModel = null;
  #destinations = null;
  #offers = null;

  constructor(tripPointsList, tripPointsModel, changeData) {
    this.#tripPointsList = tripPointsList;
    this.#changeData = changeData;
    this.#tripPointsModel = tripPointsModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editingTripPointComponent !== null) {
      return;
    }
    this.#destinations = [...this.#tripPointsModel.destinations];
    this.#offers = [...this.#tripPointsModel.offers];

    this.#editingTripPointComponent = new EditingTripPointView({
      destination: this.#destinations,
      offers: this.#offers,
      isNewTripPoint: true
    });
    this.#editingTripPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editingTripPointComponent.setResetClickHandler(this.#handleResetClick);

    render(this.#editingTripPointComponent, this.#tripPointsList, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editingTripPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editingTripPointComponent);
    this.#editingTripPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_TRIP_POINT,
      UpdateType.MINOR,
      {id: crypto.randomUUID(), ...point},
    );
    this.destroy();
  };
}
