import NewTripPointButtonPresenter from './presenter/new-trip-point-button-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPointsModel from './model/trip-point-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import TripPointsApiService from './apiservice/trip-points-api-service.js';
import DestinationsApiService from './apiservice/destinations-api-service.js';
import OffersApiService from './apiservice/offers-api-service.js';
import { END_POINT, AUTHORIZATION } from './const.js';
//
const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const tripPointsModel = new TripPointsModel(new TripPointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement.querySelector('.trip-controls__filters'),
  filterModel: filterModel,
  tripPointsModel: tripPointsModel,
});
filterPresenter.init();

const boardPresenter = new BoardPresenter({
  tripInfoContainer: siteHeaderElement.querySelector('.trip-main__trip-info'),
  tripContainer: siteMainElement.querySelector('.trip-events'),
  tripPointsModel: tripPointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});

boardPresenter.init();

const newTripPointButtonPresenter = new NewTripPointButtonPresenter({
  newTripPointButtonContainer: siteHeaderElement,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  boardPresenter: boardPresenter
});


newTripPointButtonPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    tripPointsModel.init().finally(() => {
      newTripPointButtonPresenter.renderNewTripPointButton();
    });
  });
});
