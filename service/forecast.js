const fs = require('fs');
const utils = require("./utils");
const weatherGroupList = JSON.parse(fs.readFileSync('./base/weather.json'));

this.forecast = (cityId) => {
  return weatherGroupList.filter(weatherGroup => weatherGroup.locale.id == cityId);
}

this.forecastByDate = (cityId, dateString) => {

  let date = utils.parseDateString(dateString);

  return weatherGroupList.reduce((result, weatherGroup) => {
    let periodBegin = utils.parseDateString(weatherGroup.period.begin);
    let periodEnd = utils.parseDateString(weatherGroup.period.end);

    if (weatherGroup.locale.id == cityId && periodBegin < date < periodEnd) {
      result.push(weatherGroup.weather.filter(weather => weather.date == date));
    }

    return result;
  }, []);
}

module.exports = this;
