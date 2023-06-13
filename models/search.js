const MapboxApi = require('./mapbox_api');
const History = require('./history');
const SearchData = require('./search_data');
const OpenWeatherMapApi = require('./open_weather_map_api');

class Search {
  constructor() {
    this.mapboxApi = new MapboxApi();
    this.openWeatherApi = new OpenWeatherMapApi();
    this.history = new History();
  }

  async find(place = '') {
    try {
      const resp = await this.mapboxApi.fetch(place);

      return SearchData.get(resp.data.features);
    } catch (error) {
      return [];
    }
  }

  async weather(coordinates) {
    try {
      const resp = await this.openWeatherApi.fetch(coordinates);

      return resp.data;
    } catch (error) {
      return [];
    }
  }

  addHistory(place = '') {
    this.history.add(place);
  }

  read() {

  }
}

module.exports = Search;
