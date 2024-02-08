function showWeatherDetails(response) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateELement.innerHTML = formatDate(currentDate);
  let temperatureElement = document.querySelector("#current-temperature-value");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#current-wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = response.data.condition.description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `
http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.city);
}
function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherDetails);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
function getForecast(city) {
  let apiKey = "e3b5tabo33a51804d1f4de7a47bd9d3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}
function displayForcast(response) {
  let forecast = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` <div class="row">
            <div class="col-2">
              <div class="weather-forcast-date"></div>
              ${day} <img src="" alt="" />
              <div class="weather-focast-temperature">
                <span class="weather-forcast-temperature-maximun">18</span
                ><span class="weather-forcast-temperature-minimun">12</span>
              </div>
            </div>`;
  });
  forecast.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("paris");
