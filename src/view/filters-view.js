import AbstractView from '../framework/view/abstract-view.js';

const generateFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${type === currentFilterType ? 'checked' : ''} value="${type}" ${count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`
  );
};

const generateFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsMarkup = filterItems
    .map((filter) => generateFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsMarkup}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return generateFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterChangeHandler = (callback) => {
    this._callback.filterChange = callback;
    this.element.addEventListener('change', this.#filterChangeHandler);
  };

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterChange(evt.target.value);
  };
}
