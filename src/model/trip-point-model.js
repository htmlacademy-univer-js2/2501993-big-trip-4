export default class TripPointsModel {
  #tripPoints = [];
  #destinations = [];
  #offers = [];

  init(tripPoints, destinations, offers) {
    this.#tripPoints = tripPoints;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  get Destinations() {
    return this.#destinations;
  }

  get Offers() {
    return this.#offers;
  }
}
