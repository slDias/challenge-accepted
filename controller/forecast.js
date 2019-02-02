const service = require("../service/forecast.js");
const utils = require("../service/utils");

this.forecast = function(req, res, next) {
  let cityId = req.query.cityId;

  if(!cityId) {
    err = new Error("Parameter 'cityId' must not be null");
    return next(err);
  }

  try {
    res.send(service.forecast(cityId));
  } catch(err) {
    next(err);
  }
}

this.forecastByDate = function(req, res, next) {
  let cityId = req.query.cityId;
  let dateString = req.query.date;

  if(!dateString || !cityId) {
    err = new Error("Parameters 'date' and 'cityId' must not be null");
    return next(err);
  }

  let date = utils.parseDateString(dateString);

  try {
    res.send(service.forecast(cityId, date));
  } catch(err) {
    next(err);
  }
}

module.exports = this;
