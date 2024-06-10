import ApiService from '../framework/api-service.js';
import { ApiServiceResponseMethod } from '../const.js';

export default class TripPointsApiService extends ApiService {
  get tripPoints() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updateTripPoint = async (tripPoint) => {
    const response = await this._load({
      url: `points/${tripPoint.id}`,
      method: ApiServiceResponseMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(tripPoint)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  addTripPoint = async (tripPoint) => {
    const response = await this._load({
      url: 'points',
      method: ApiServiceResponseMethod.POST,
      body: JSON.stringify(this.#adaptToServer(tripPoint)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteTripPoint = async (tripPoint) => {
    const response = await this._load({
      url: `points/${tripPoint.id}`,
      method: ApiServiceResponseMethod.DELETE,
    });

    return response;
  };

  #adaptToServer = (tripPoint) => {
    const adaptedTripPoint = {...tripPoint,
      'base_price': tripPoint.basePrice,
      'date_from': tripPoint.dateFrom instanceof Date ? tripPoint.dateFrom.toISOString() : null,
      'date_to': tripPoint.dateTo instanceof Date ? tripPoint.dateTo.toISOString() : null,
      'is_favorite': tripPoint.isFavorite,
    };

    delete adaptedTripPoint.basePrice;
    delete adaptedTripPoint.dateFrom;
    delete adaptedTripPoint.dateTo;
    delete adaptedTripPoint.isFavorite;

    return adaptedTripPoint;
  };
}
