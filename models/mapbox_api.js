const axios = require('axios');

class MapboxApi {
  baseURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;

  baseParams = {
    'access_token': process.env.MAPBOX_TOKEN,
    'limit': 5,
    'language': 'es'
  };

  constructor(params) {
    this.instance = axios.create({
      baseURL: this.baseURL,
      params: Object.assign({}, this.baseParams, params)
    });
  }

  fetch(place) {
    return this.instance.get(`${place}.json`);
  }
}

module.exports = MapboxApi;
