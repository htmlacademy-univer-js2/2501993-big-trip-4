import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';
import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getDateTime } from '../utiltools/trip-point-date.js';
import { TripPointType, TripPointTypeDescription } from '../const.js';


const renderDestinationPictures = (pictures) => pictures.length === 0 ? '' :
  pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

const renderDestinationNames = (destinations) => destinations.length === 0 ? '' :
  destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

const renderOffers = (allOffers, checkedOffers, isDisabled) => allOffers.map((offer) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-luggage" ${checkedOffers.includes(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
<label class="event__offer-label" for="${offer.id}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`).join('');

const renderOffersContainer = (allOffers, isDisabled, checkedOffers) => (!allOffers || allOffers.offers.length === 0) ? '' :
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${renderOffers(allOffers.offers, isDisabled, checkedOffers)}
    </div>
    </section>`;

const renderEditingPointDateTemplate = (dateFrom, isDisabled, dateTo) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateTime(dateFrom)} ${isDisabled ? 'disabled' : ''}">
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateTime(dateTo)} ${isDisabled ? 'disabled' : ''}">
  </div>`
);

const renderEditingPointTypeTemplate = (currentType, isDisabled) => Object.values(TripPointType).map((type) => `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${TripPointTypeDescription[type]}</label>
</div>`).join('');

const renderDestinationContainer = (destination) => {
  if (destination && destination.description) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description !== null ? destination.description : ''}</p>
    <div class="event__photos-container">
                <div class="event__photos-tape">
                ${renderDestinationPictures(destination.pictures)}
                </div>
              </div>
  </section>`;
  }
  return '';
};

const renderResetButtonTemplate = (isNewTripPoint, isDisabled, isDeleting) => isNewTripPoint ? `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>` :
  `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
  <button class="event__rollup-btn" type="button">`;


const renderDetailsContainer = (destinationData, allTripPointTypeOffers, offers, isDisabled) => (destinationData && destinationData.description) || allTripPointTypeOffers.offers.length > 0 ? `<section class="event__details">
  ${renderOffersContainer(allTripPointTypeOffers, offers, isDisabled)}
  ${renderDestinationContainer(destinationData)}
  </section>` : '';


const createEditingTripPointTemplate = (tripPoint, destinations, allOffers, isNewTripPoint) => {
  const {basePrice, type, destination, dateFrom, dateTo, offers, isDisabled, isSaving, isDeleting} = tripPoint;
  const allTripPointTypeOffers = allOffers.find((offer) => offer.type === type);
  const destinationData = destinations.find((item) => item.id === destination);
  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${renderEditingPointTypeTemplate(type, isDisabled)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${destination}">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${destination}"
          type="text" name="event-destination" value="${destinationData ? he.encode(destinationData.name) : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}
          onfocus="this.value=''">
          <datalist id="destination-list-1">
            ${renderDestinationNames(destinations)}
          </datalist>
        </div>
        ${renderEditingPointDateTemplate(dateFrom, dateTo, isDisabled)}
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input event__input--price" id="event-price-1" type="number" name="event-price" min='0' value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        ${renderResetButtonTemplate(isNewTripPoint, isDisabled, isDeleting)}
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      ${renderDetailsContainer(destinationData, allTripPointTypeOffers, offers, isDisabled)}
    </form>
  </li>`
  );
};

const TRIP_POINT_BLANK = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: null,
  isFavorite: false,
  offers: [],
  type: TripPointType.FLIGHT,
};

export default class EditingTripPointView extends AbstractStatefulView {
  #destination = null;
  #offers = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #offersByType = null;
  #isNewTripPoint = null;

  constructor({tripPoint = TRIP_POINT_BLANK, destination, offers, isNewTripPoint}) {
    super();
    this._state = EditingTripPointView.parseTripPointToState(tripPoint);
    this.#destination = destination;
    this.#offers = offers;
    this.#offersByType = this.#offers.find((offer) => offer.type === this._state.type);
    this.#isNewTripPoint = isNewTripPoint;
    this._restoreHandlers();
  }

  removeElement = () => {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  get template() {
    return createEditingTripPointTemplate(this._state, this.#destination, this.#offers, this.#isNewTripPoint);
  }

  reset = (tripPoint) => {
    this.updateElement(
      EditingTripPointView.parseTripPointToState(tripPoint),
    );
  };

  setResetClickHandler = (callback) => {
    this._callback.resetClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formResetClickHandler);
  };

  setPreviewClickHandler = (callback) => {
    this._callback.previewClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#previewClickHandler);
  };

  #previewClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.previewClick();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditingTripPointView.parseStateToTripPoint(this._state));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setOuterHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  };

  #tripPointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = this.#destination.find((dest) => dest.name === evt.target.value);
    this.updateElement({
      destination: destination.id,
    });
  };

  #tripPointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._state.offers = [];
    this.#offersByType = this.#offers.find((offer) => offer.type === evt.target.value);
    this.updateElement({
      type: evt.target.value,
    });
  };

  #tripPointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  #tripPointDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #tripPointDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickerFrom = () => {
    if (this._state.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onChange: this.#tripPointDateFromChangeHandler,
        },
      );
    }
  };

  #setDatepickerTo = () => {
    if (this._state.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this.#tripPointDateToChangeHandler,
        },
      );
    }
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const offerId = evt.target.id;
    const offers = this._state.offers.filter((n) => n !== offerId);
    let currentOffers = [...this._state.offers];
    if (offers.length !== this._state.offers.length) {
      currentOffers = offers;
    }
    else {
      currentOffers.push(offerId);
    }
    this._setState({
      offers: currentOffers,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#tripPointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#tripPointDestinationChangeHandler);
    if (this.#offersByType && this.#offersByType.offers.length > 0) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#tripPointPriceChangeHandler);
  };

  #setOuterHandlers = () => {
    if (!this.#isNewTripPoint) {
      this.setPreviewClickHandler(this._callback.previewClick);
    }
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setResetClickHandler(this._callback.resetClick);
  };

  #formResetClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.resetClick(EditingTripPointView.parseStateToTripPoint(this._state));
  };

  static parseTripPointToState = (tripPoint) => ({...tripPoint,
    dateTo: dayjs(tripPoint.dateTo).toDate(),
    dateFrom: dayjs(tripPoint.dateFrom).toDate(),
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToTripPoint = (state) => {
    const tripPoint = {...state};
    delete tripPoint.isDisabled;
    delete tripPoint.isSaving;
    delete tripPoint.isDeleting;

    return tripPoint;
  };
}
