import { render } from './framework/render.js';
import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripPointPresenter from './presenter/trip-point-presenter.js';
import TripPointsModel from './model/trip-point-model.js';
import { getTripPoints, getDestinations, getOffersByType } from './mock/trip-point.js';
import { generateFilter } from './mocks/filter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');


const tripPoints = getTripPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const tripPointsModel = new TripPointsModel();

tripPointsModel.init(tripPoints, destinations, offersByType);
const boardPresenter = new BoardPresenter(siteMainElement.querySelector('.trip-events'), tripPointsModel);

boardPresenter.init();

const filters = generateFilter(tripPointsModel.tripPoints);

render(new FiltersView({filters}), siteHeaderElement.querySelector('.trip-controls__filters'));
