import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewTripPointButtonPresenter from './presenter/new-trip-point-button-presenter.js';
import TripPointModel from './model/trip-point-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import TripPointsApiService from './apiservice/trip-points-api-service.js';
import DestinationsApiService from './apiservice/destinations-api-service.js';
import OffersApiService from './apiservice/offers-api-service.js';
import { END_POINT, AUTHORIZATION } from './const.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const tripPointModel = new TripPointModel(new TripPointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement.querySelector('.trip-controls__filters'),
  filterModel,
  tripPointModel
});
filterPresenter.init();

const boardPresenter = new BoardPresenter({
  tripInfoContainer: siteHeaderElement.querySelector('.trip-main__trip-info'),
  tripContainer: siteMainElement.querySelector('.trip-events'),
  tripPointModel,
  filterModel,
  destinationsModel,
  offersModel
});
boardPresenter.init();

const newTripPointButtonPresenter = new NewTripPointButtonPresenter({
  newTripPointButtonContainer: siteHeaderElement,
  destinationsModel,
  offersModel,
  boardPresenter
});
newTripPointButtonPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    tripPointModel.init().finally(() => {
      newTripPointButtonPresenter.renderNewTripPointButton();
    });
  });
});
