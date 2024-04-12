import { render } from './framework/render.js';
import FiltersView from './view/filters-view.js';
import TripPointPresenter from './presenter/trip-point-presenter.js';
import TripPointsModel from './model/trip-point-model.js';
import { getTripPoints, getDestinations, getOffersByType } from './mock/trip-point.js';

const HeaderContainer = document.querySelector('.trip-main');
const MainContainer = document.querySelector('.page-main');
const tripPointsPresenter = new TripPointPresenter(MainContainer.querySelector('.trip-events'));

const tripPoints = getTripPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const tripPointsModel = new TripPointsModel();

render(new FiltersView(), HeaderContainer.querySelector('.trip-controls__filters'));

tripPointsModel.init(tripPoints, destinations, offersByType);
tripPointsPresenter.init(tripPointsModel);
