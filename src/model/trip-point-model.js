export default class TripPointsModel {
  constructor() {
    this.tripPoints = [];
  }

  init(tripPoints, destinations, offers) {
    this.tripPoints = tripPoints;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTripPoints() {
    return this.tripPoints;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
