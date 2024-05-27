import SortView from '../view/sort-view.js';
import { remove, render, RenderPosition} from '../framework/render.js';
import TripPointListView from '../view/trip-point-list-view.js';
import NoTripPointView from '../view/no-trip-point-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import NewTripPointPresenter from './new-trip-point-presenter.js';
import { sorting } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import { UpdateType, UserAction, SortType, FilterType } from '../const.js';


export default class BoardPresenter {
  #tripContainer = null;
  #tripPointsModel = null;
  #filterModel = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #tripPointsList = new TripPointListView();
  #sortComponent = null;
  #noTripPointComponent = null;

  #tripPointPresenter = new Map();
  #newTripPointPresenter = null;

  constructor(tripContainer, tripPointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#filterModel = filterModel;

    this.#newTripPointPresenter = new NewTripPointPresenter(this.#tripPointsList.element, this.#tripPointsModel, this.#handleViewAction);
    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripPoints() {
    this.#filterType = this.#filterModel.filter;
    const tripPoints = this.#tripPointsModel.tripPoints;
    const filteredTripPoints = filter[this.#filterType](tripPoints);
    sorting[this.#currentSortType](filteredTripPoints);
    return filteredTripPoints;
  }

  init () {
    this.#renderBoard();
  }

  createTripPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (this.#noTripPointComponent) {
      remove(this.#noTripPointComponent);
      render(this.#tripPointsList, this.#tripContainer);
    }
    this.#newTripPointPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#newTripPointPresenter.destroy();
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP_POINT:
        this.#tripPointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TRIP_POINT:
        this.#tripPointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TRIP_POINT:
        this.#tripPointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripPoint = (tripPoint) => {
    const tripPointPresenter = new TripPointPresenter(this.#tripPointsList.element, this.#tripPointsModel, this.#handleViewAction, this.#handleModeChange);
    tripPointPresenter.init(tripPoint);
    this.#tripPointPresenter.set(tripPoint.id, tripPointPresenter);
  };

  #renderTripPoints = (tripPoints) => {
    tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  };

  #renderNoTripPoints = () => {
    this.#noTripPointComponent = new NoTripPointView(this.#filterType);
    render(this.#noTripPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripPointList = () => {
    render(this.#tripPointsList, this.#tripContainer);
    this.#renderTripPoints(this.tripPoints);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#newTripPointPresenter.destroy();
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noTripPointComponent) {
      remove(this.#noTripPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderBoard = () => {
    const tripPoints = this.tripPoints;
    const tripPointCount = tripPoints.length;

    if (tripPointCount === 0) {
      this.#renderNoTripPoints();
      return;
    }
    this.#renderSort();
    this.#renderTripPointList();
  };
}
