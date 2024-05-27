import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/sort-view.js';
import { remove, render, RenderPosition} from '../framework/render.js';
import TripPointListView from '../view/trip-point-list-view.js';
import NoTripPointView from '../view/no-trip-point-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import NewTripPointPresenter from './new-trip-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import NoMoreInfoView from '../view/no-more-info-view.js';
import TripInfoPresenter from './trip-info-presenter.js';
import { sorting } from '../utiltools/sort.js';
import { filter } from '../utiltools/filter.js';
import { UpdateType, UserAction, SortType, FilterType, TimeLimit } from '../const.js';


export default class BoardPresenter {
  #tripContainer = null;
  #tripInfoContainer = null;
  #offersModel = null;
  #tripPointsModel = null;
  #filterModel = null;
  #destinationsModel = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #tripPointsList = new TripPointListView();
  #sortComponent = null;
  #noTripPointComponent = null;
  #loadingComponent = new LoadingView();
  #NoMoreInfoViewComponent = new NoMoreInfoView();

  #tripPointPresenter = new Map();
  #newTripPointPresenter = null;
  #tripInfoPresenter = null;

  constructor({tripInfoContainer,tripContainer, tripPointsModel, filterModel, destinationsModel, offersModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripContainer = tripContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#newTripPointPresenter = new NewTripPointPresenter({
      tripPointsList: this.#tripPointsList.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      changeData: this.#handleViewAction,
    });

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_TRIP_POINT:
        this.#tripPointPresenter.get(update.id).setSaving();
        try {
          await this.#tripPointsModel.updateTripPoint(updateType, update);
        } catch(err) {
          this.#tripPointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TRIP_POINT:
        this.#newTripPointPresenter.setSaving();
        try {
          await this.#tripPointsModel.addTripPoint(updateType, update);
        } catch(err) {
          this.#newTripPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TRIP_POINT:
        this.#tripPointPresenter.get(update.id).setDeleting();
        try {
          await this.#tripPointsModel.deleteTripPoint(updateType, update);
        } catch(err) {
          this.#tripPointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        this.#clearTripInfo();
        this.#renderTripInfo();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        this.#renderTripInfo();
        break;
    }
  };

  #renderTripInfo = () => {
    this.#tripInfoPresenter = new TripInfoPresenter(this.#tripInfoContainer, this.#destinationsModel, this.#offersModel);
    this.#tripInfoPresenter.init(this.#tripPointsModel.tripPoints);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripPoint = (tripPoint) => {
    const tripPointPresenter = new TripPointPresenter({
      tripPointsList: this.#tripPointsList.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      changeData: this.#handleViewAction,
      changeMode: this.#handleModeChange,
    });

    tripPointPresenter.init(tripPoint);
    this.#tripPointPresenter.set(tripPoint.id, tripPointPresenter);
  };

  #renderNoMoreInfo = () => {
    render(this.#NoMoreInfoViewComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripPoints = (tripPoints) => {
    tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  };

  #clearTripInfo = () => {
    this.#tripInfoPresenter.destroy();
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoTripPoints = () => {
    this.#noTripPointComponent = new NoTripPointView(this.#filterType);
    render(this.#noTripPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripPointList = (tripPoints) => {
    render(this.#tripPointsList, this.#tripContainer);
    this.#renderTripPoints(tripPoints);
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
    remove(this.#loadingComponent);

    if (this.#noTripPointComponent) {
      remove(this.#noTripPointComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#offersModel.offers.length === 0 || this.#destinationsModel.destinations.length === 0) {
      this.#renderNoMoreInfo();
      return;
    }

    const tripPoints = this.tripPoints;
    const tripPointCount = tripPoints.length;

    if (tripPointCount === 0) {
      this.#renderNoTripPoints();
      return;
    }
    this.#renderTripPointList(tripPoints);
    this.#renderSort();
  };
}
