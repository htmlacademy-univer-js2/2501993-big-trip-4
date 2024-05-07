import SortingView from '../view/sorting-view.js';
import { remove, render, RenderPosition} from '../framework/render.js';
import TripPointListView from '../view/trip-point-list-view.js';
import NoTripPointView from '../view/no-trip-point-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import { sorting, updateItem, SortType } from '../utils.js';


export default class BoardPresenter {
  #tripContainer = null;
  #tripPointsModel = null;
  #tripPoints = null;

  #currentSortType = SortType.DAY;

  #tripPointsList = new TripPointListView();
  #sortComponent = null;
  #noTripPointComponent = new NoTripPointView();

  #tripPointPresenter = new Map();

  constructor(tripContainer, tripPointsModel) {
    this.#tripContainer = tripContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  #sortTripPoint = (sortType) => {
    sorting[sortType](this.#tripPoints);
  };

  init () {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];

    if (this.#tripPoints.length === 0) {
      this.#renderNoTripPoints();
    }
    else {
      this.#renderSort();
      this.#renderTripPointList();
    }
  }

  #handleModeChange = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#tripPointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => {
    this.#sortTripPoint(this.#currentSortType);
    this.#sortComponent = new SortingView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripPoint = (tripPoint) => {
    const tripPointPresenter = new TripPointPresenter(this.#tripPointsList.element, this.#tripPointsModel, this.#handlePointChange, this.#handleModeChange);
    tripPointPresenter.init(tripPoint);
    this.#tripPointPresenter.set(tripPoint.id, tripPointPresenter);
  };

  #renderTripPoints = (from, to) => {
    this.#tripPoints
      .slice(from, to)
      .forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  };

  #renderNoTripPoints = () => {
    render(this.#noTripPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #clearTripPointList = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
  };

  #renderTripPointList = () => {
    render(this.#tripPointsList, this.#tripContainer);
    this.#renderTripPoints(0, this.#tripPoints.length);
  };
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    remove(this.#sortComponent);
    this.#renderSort();
    this.#clearTripPointList();
    this.#renderTripPointList();
  };
}
