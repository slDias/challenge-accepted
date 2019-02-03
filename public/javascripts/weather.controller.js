export function getCity(city, onFetched) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `forecast?cityId=${city.id}`, true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let weatherList = JSON.parse(this.responseText);

      // Check if response is empty
      if(Object.keys(weatherList).length === 0 && weatherList.constructor === Object) {
        alert("Nenhuma previsão encontrada!");
      }

      onFetched(weatherList);
    }
  }
  xhr.send();
}

export function makeCard(weatherList) {
   return weatherList.map(weather => {
     let card = document.createElement('div');
     let weatherDate = weather.date.split("-")
     let dateString = `${weatherDate[2]}/${weatherDate[1]}/${weatherDate[0]}`
     card.innerHTML = `
     <div class="weather-card">
      <div class="weather-card-desc">
        <b>${dateString}</b><br>
        ${weather.text}<br>
      </div>
      <div class="weather-card-icos">
        <div class="weather-card-max-min">
          <div class="weather-card-max">
            <img src="images/icons/upload.png" alt="maxima">
            ${weather.temperature.max}ºC
          </div>
          <div class="weather-card-min">
            <img src="images/icons/download.png" alt="minima">
            ${weather.temperature.min}ºC
          </div>
        </div>
        <div class="weather-card-rain">
          <div class="weather-card-mm">
            <img src="images/icons/raindrop-close-up.png" alt="">
            ${weather.rain.precipitation}mm
          </div>
          <div class="weather-card-chance">
            <img src="images/icons/protection-symbol-of-opened-umbrella-silhouette-under-raindrops.png" alt="Chance de chuva">
            ${weather.rain.probability}%
          </div>
        </div>
      </div>
    </div>
    `;
    return card;
   });
}