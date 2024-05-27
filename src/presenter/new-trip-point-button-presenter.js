import { render } from '../framework/render.js';
import NewTripPointButtonView from '../view/new-trip-point-button-view.js';

export default class NewTripPointButtonPresenter {
  #newTripPointButtonContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #boardPresenter = null;

  #newTripPointButtonPart = null;

  constructor({newTripPointButtonContainer, destinationsModel, offersModel, boardPresenter}) {
    this.#newTripPointButtonContainer = newTripPointButtonContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#boardPresenter = boardPresenter;
  }

  init() {
    this.#newTripPointButtonPart = new NewTripPointButtonView();
  }

  #handleblankTripPointFormClose = () => {
    this.#newTripPointButtonPart.element.disabled = false;
  };

  #handleNewblankTripPointButtonClick = () => {
    this.#boardPresenter.createTripPoint(this.#handleblankTripPointFormClose);
    this.#newTripPointButtonPart.element.disabled = true;
  };

  renderNewTripPointButton = () => {
    render(this.#newTripPointButtonPart, this.#newTripPointButtonContainer);
    this.#newTripPointButtonPart.setClickHandler(this.#handleNewblankTripPointButtonClick);
    if (this.#offersModel.offers.length === 0 || this.#destinationsModel.destinations.length === 0) {
      this.#newTripPointButtonPart.element.disabled = true;
    }
  };
}
