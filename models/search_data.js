class SearchData {
  static get(data) {
    return data.map(place => ({
      id: place.id,
      name: place.place_name,
      lng: place.center[0],
      lat: place.center[1]
    }));
  }
}

module.exports = SearchData;
