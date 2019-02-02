const fs = require('fs');
const utils = require("./utils");
const cities = JSON.parse(fs.readFileSync('./base/locales.json'));

this.locate = (inputCityName) => {
  return cities.filter(city => utils.fitString(city.name) === utils.fitString(inputCityName))
}

module.exports = this;
