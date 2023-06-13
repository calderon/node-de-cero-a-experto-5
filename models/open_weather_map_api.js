const axios = require('axios');

class OpenWeatherMapApi {
  baseURL = `https://api.openweathermap.org/data/2.5/weather`;

  baseParams = {
    'appid': process.env.OPENWEATHERMAP_TOKEN,
    'units': 'metric',
    'lang': 'es'
  };

  constructor(params) {
    this.instance = axios.create({
      baseURL: this.baseURL,
      params: Object.assign({}, this.baseParams, params)
    });
  }

  fetch(coordinates) {
    return this.instance.get('', {
      params: coordinates
    });
  }
}

module.exports = OpenWeatherMapApi;
