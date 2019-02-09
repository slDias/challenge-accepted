const fs = require('fs');
const utils = require("./utils");
const netcdf = require("netcdfjs");
const mapData = null;

this.getMapData = (latitude, longitude, date) => {

  fs.readFile("./base/spGIS_horario.nc4", (err, data) => {
    if(err) throw err;
    let cdfReader = new netcdf(data);
    cdfReader.getDataVariable('latitude');
  });
}

module.exports = this;
