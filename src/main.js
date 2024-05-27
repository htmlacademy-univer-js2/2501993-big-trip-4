import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPointsModel from './model/trip-point-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-trip-point-button-view.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import TripPointsApiService from './api-service/trip-points-api-service.js';
import DestinationsApiService from './api-service/destinations-api-service.js';
import OffersApiService from './api-service/offers-api-service.js';
import { END_POINT, AUTHORIZATION } from './const.js';

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
  tripContainer: siteMainElement.querySelector('.trip-events'),
  tripPointsModel: tripPointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});

boardPresenter.init();

const newTripPointButtonPart = new NewPointButtonView();
const handleNewPointFormClose = () => {
  newTripPointButtonPart.element.disabled = false;
};
const handleNewblankTripPointButtonClick = () => {
  boardPresenter.createTripPoint(handleNewPointFormClose);
  newTripPointButtonPart.element.disabled = true;
};

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    tripPointsModel.init().finally(() => {
      render(newTripPointButtonPart, siteHeaderElement);
      newTripPointButtonPart.setClickHandler(handleNewblankTripPointButtonClick);
    });
  });
});
