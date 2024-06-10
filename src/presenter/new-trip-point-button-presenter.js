import { render } from '../framework/render.js';
import NewTripPointButtonView from '../view/new-trip-point-button-view.js';

export default class NewTripPointButtonPresenter {
  #newTripPointButtonContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #boardPresenter = null;

  #newTripPointButtonComponent = null;

  constructor({newTripPointButtonContainer, destinationsModel, offersModel, boardPresenter}) {
    this.#newTripPointButtonContainer = newTripPointButtonContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#boardPresenter = boardPresenter;
  }

  init() {
    this.#newTripPointButtonComponent = new NewTripPointButtonView();
  }

  renderNewTripPointButton = () => {
    render(this.#newTripPointButtonComponent, this.#newTripPointButtonContainer);
    this.#newTripPointButtonComponent.setClickHandler(this.#handleNewTripPointButtonClick);
    if (this.#offersModel.offers.length === 0 || this.#destinationsModel.destinations.length === 0) {
      this.#newTripPointButtonComponent.element.disabled = true;
    }
  };

  #handleNewTripPointFormClose = () => {
    this.#newTripPointButtonComponent.element.disabled = false;
  };

  #handleNewTripPointButtonClick = () => {
    this.#boardPresenter.createTripPoint(this.#handleNewTripPointFormClose);
    this.#newTripPointButtonComponent.element.disabled = true;
  };
}
