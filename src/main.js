import { render } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripPointsModel from './model/trip-point-model.js';
import { getTripPoints, getDestinations, getOffersByType } from './mock/trip-point.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-trip-point-button-view.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');


const tripPoints = getTripPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const tripPointsModel = new TripPointsModel();

tripPointsModel.init(tripPoints, destinations, offersByType);
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector('.trip-controls__filters'), filterModel, tripPointsModel);
filterPresenter.init();

const boardPresenter = new BoardPresenter(siteMainElement.querySelector('.trip-events'), tripPointsModel, filterModel);

boardPresenter.init();

const newTripPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newTripPointButtonComponent.element.disabled = false;
};

const handleNewTripPointButtonClick = () => {
  boardPresenter.createTripPoint(handleNewPointFormClose);
  newTripPointButtonComponent.element.disabled = true;
};

render(newTripPointButtonComponent, siteHeaderElement);
newTripPointButtonComponent.setClickHandler(handleNewTripPointButtonClick);
