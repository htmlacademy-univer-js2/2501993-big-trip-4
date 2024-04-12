import { render } from './framework/render.js';
import FiltersView from './view/filters-view.js';
import TripPointPresenter from './presenter/trip-point-presenter.js';
import TripPointsModel from './model/trip-point-model.js';
import { getTripPoints, getDestinations, getOffersByType } from './mock/trip-point.js';
import { generateFilter } from './mocks/filter.js';

const HeaderContainer = document.querySelector('.trip-main');
const MainContainer = document.querySelector('.page-main');
const tripPointsPresenter = new TripPointPresenter(MainContainer.querySelector('.trip-events'));

const tripPoints = getTripPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const tripPointsModel = new TripPointsModel();

tripPointsModel.init(tripPoints, destinations, offersByType);
tripPointsPresenter.init(tripPointsModel);

const filters = generateFilter(tripPointsModel.tripPoints);

render(new FiltersView({filters}), siteHeaderElement.querySelector('.trip-controls__filters'));
