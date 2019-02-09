const service = require("../service/mapData.js");
const utils = require("../service/utils");

this.getMapData = function(req, res, next) {
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;
  let dateString = req.query.date;

  if(!dateString || !latitude || !longitude) {
    err = new Error("Parameters 'date' and 'latitude' and 'longitude' must not be null");
    return next(err);
  }

  let date = utils.parseDateString(dateString);

  try {
    res.send(service.getMapData(latitude, longitude, date));
  } catch(err) {
    next(err);
  }
}

module.exports = this;
