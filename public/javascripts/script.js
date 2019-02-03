import * as mapController from "./map.controller.js";
import * as weatherController from './weather.controller.js';

const citySearchInput = document.getElementById("citySearchInput");
const citySearchButton = document.getElementById("citySearchButton");
const searchDiv = document.getElementById("search");
const weatherCardList = document.getElementById("card-list");
const cardSection = document.getElementById("card-section");
const mapSection = document.getElementById("map-section");

cardSection.hidden = true;

// Trigger search when pressed "Enter" inside the search box
citySearchInput.addEventListener("keyup", function(event) {
  event.preventDefault();

  if (event.keyCode === 13) {
    citySearchButton.click();
  }
});

citySearchButton.addEventListener("click", function(event) {
  event.preventDefault();

  let searchText = citySearchInput.value;

  if (searchText === "") {
    alert("Digite o municipio desejado. Exemplo: 'Osasco'");
    searchDiv.style.border = "solid 1px red";
    setTimeout(() => {
      searchDiv.style.border = "0";
    }, 3000)
    return
  }

  let xhr = new XMLHttpRequest();
  xhr.open("GET", `locate?searchText=${searchText}`, true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);

      // Check if response is empty
      if(Object.keys(response).length === 0 && response.constructor === Object) {
        alert("Nenhum municipio encontrado!");
      }

      let city = response[0];
      mapController.goToCity(city);
      weatherController.getCity(city, addToWeatherList);
    }
  }
  xhr.send();
})

function addToWeatherList(weatherList) {
  let weatherObj = weatherList[0];
  weatherCardList.innerHTML += `${weatherObj.locale.name} - ${weatherObj.locale.state}`
  weatherController.makeCard(weatherObj.weather).forEach(weatherCard => {
    weatherCardList.appendChild(weatherCard)
  });
  cardSection.hidden = false;
  mapSection.style.margin = 0;
  mapSection.style.cssFloat = 'left';
}