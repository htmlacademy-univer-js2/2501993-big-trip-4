import { render, RenderPosition } from './render';
import DestinationView from './view/destination-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import RoutePresenter from './presenter/route-presenter';

const siteDestinationContainer = document.querySelector('.trip-main');
const siteFilterContainer = document.querySelector('.trip-controls__filters');
const siteSortContainer = document.querySelector('.trip-events');
const routePresenter = new RoutePresenter({routeContainer: siteSortContainer});

render(new DestinationView(), siteDestinationContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterContainer);
render(new SortView(), siteSortContainer);
routePresenter.init();
