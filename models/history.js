const fs = require('fs');

class History {
  defaults = {
    maxStoryLength: 6,
    history: []
  };

  database = './db/database.json';

  constructor() {
    this.history = this.read() || this.defaults.history;
    this._maxStoryLength = this.defaults.maxStoryLength;
  }

  add(...places) {
    [].concat(...places).forEach(place => {
      if (!this.history.includes(place.toLowerCase())) {
        this.history.unshift(place.toLowerCase());
      }
    });

    this.save();
  }

  read() {
    let data = [];

    if (!fs.existsSync(this.database)) {
      return data;
    }

    const fileContent = fs.readFileSync(this.database, { encoding: 'utf-8' });

    if (fileContent.length > 0) {
      data = JSON.parse(fileContent);
      data = data.history || [];
    }

    return data;
  }

  save() {
    const payload = {
      history: this.history
    };

    fs.writeFileSync(this.database, JSON.stringify(payload));
  }

  print() {
    this.history.forEach((place, index) => {
      const idx = `${index+1}`.green
      console.log(`${idx}. ${place}`);
    })
  }
}

module.exports = History;
