import { render, remove, RenderPosition } from '../framework/render.js';
import EditingTripPointView from '../view/editing-trip-point-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewTripPointPresenter {
  #tripPointsList = null;
  #creatingTripPointComponent = null;

  #changeData = null;
  #destroyCallback = null;

  #tripPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #destinations = null;
  #offers = null;

  constructor({tripPointsList, tripPointsModel, destinationsModel, offersModel, changeData}) {
    this.#tripPointsList = tripPointsList;
    this.#changeData = changeData;
    this.#tripPointsModel = tripPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#creatingTripPointComponent !== null) {
      return;
    }
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#creatingTripPointComponent = new EditingTripPointView({
      destination: this.#destinations,
      offers: this.#offers,
      isNewTripPoint: true
    });
    this.#creatingTripPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#creatingTripPointComponent.setResetClickHandler(this.#handleResetClick);

    render(this.#creatingTripPointComponent, this.#tripPointsList, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#creatingTripPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#creatingTripPointComponent);
    this.#creatingTripPointComponent = null;

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
