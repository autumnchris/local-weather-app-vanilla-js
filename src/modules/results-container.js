import moment from 'moment';
import { WeatherRequest } from './weather-request';

const ResultsContainer = (() => {
  let tempType = JSON.parse(localStorage.getItem('tempType')) || 'f';
  let tempValues = {
    currentTemp: {
      fahrenheit: null,
      celsius: null
    },
    hourlyForecast: [],
    dailyForecast: []
  };

  function renderHourlyForecast(hourlyForecast) {
    document.querySelector('.hourly-forecast tbody').innerHTML = hourlyForecast.slice(0, 24).map(hour => {
      return `<tr>
        <td>${moment(hour.time * 1000).format('hA')}</td>
        <td class="wi wi-forecast-io-${hour.icon} weather-icon"></td>
        <td>${tempType === 'f' ? Math.round(hour.temperature) : Math.round((hour.temperature - 32) * (5/9))}&deg;</td>
      </tr>`;
    }).join('');
  }

  function renderDailyForecast(dailyForecast) {
    document.querySelector('.daily-forecast tbody').innerHTML = dailyForecast.slice(0, 5).map(day => {
      return `<tr>
        <td>${moment(day.time * 1000).format('ddd')}</td>
        <td>${tempType === 'f' ? Math.round(day.temperatureMax) : Math.round((day.temperatureMax - 32) * (5/9))}&deg;/${tempType === 'f' ? Math.round(day.temperatureMin) : Math.round((day.temperatureMin - 32) * (5/9))}&deg;</td>
        <td class="wi wi-forecast-io-${day.icon} weather-icon"></td>
        <td>${day.summary}</td>
      </tr>`;
    }).join('');
  }

  function renderWeatherResults(apiData) {
    tempValues = {
      currentTemp: {
        fahrenheit: Math.round(apiData.currentWeather.temp),
        celsius: Math.round((apiData.currentWeather.temp - 32) * (5/9))
      },
      hourlyForecast: apiData.hourlyForecast,
      dailyForecast: apiData.dailyForecast
    };

    const weatherContent = document.createElement('div');
    weatherContent.classList.add('weather-content');
    weatherContent.innerHTML = `
    <div class="col">
      <div class="location">${apiData.city}</div>
      <div class="current-weather">
        <div class="temp">${tempType === 'f' ? tempValues.currentTemp.fahrenheit : tempValues.currentTemp.celsius}&deg;${tempType.toUpperCase()}</div>
        <div class="wi wi-forecast-io-${apiData.currentWeather.weatherIcon} weather-icon"></div>
        <div class="weather-summary">${apiData.currentWeather.weatherSummary}</div>
      </div>
      <table class="sunrise-sunset">
        <thead>
          <tr>
            <th>Sunrise</th>
            <th>Sunset</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${moment(apiData.sunriseTime * 1000).format('h:mm A')}</td>
            <td>${moment(apiData.sunsetTime * 1000).format('h:mm A')}</td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="button switch-button ${tempType}">&deg;${tempType.toUpperCase()}</button>
    </div>
    <div class="col">
      <table class="hourly-forecast">
        <tbody></tbody>
      </table>
      <table class="daily-forecast">
        <thead>
          <tr>
            <th>Day</th>
            <th>High/Low</th>
            <th colspan="2">Weather</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>`;

    document.querySelector('main').appendChild(weatherContent);
    renderHourlyForecast(tempValues.hourlyForecast);
    renderDailyForecast(tempValues.dailyForecast);
  }

  function toggleTempType() {
    tempType === 'f' ? tempType = 'c' : tempType = 'f';
    renderTempTypeChange();
    localStorage.setItem('tempType', JSON.stringify(tempType));
  }

  function renderTempTypeChange() {
    const switchButton = document.querySelector('.switch-button');
    switchButton.classList.add(tempType);
    switchButton.classList.remove(tempType === 'f' ? 'c' : 'f');
    switchButton.innerHTML = `&deg;${tempType.toUpperCase()}`;
    document.querySelector('.current-weather .temp').innerHTML = `${tempType === 'f' ? tempValues.currentTemp.fahrenheit : tempValues.currentTemp.celsius}&deg;${tempType.toUpperCase()}`;
    renderHourlyForecast(tempValues.hourlyForecast);
    renderDailyForecast(tempValues.dailyForecast);
  }

  function renderLoadingSpinner() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingSpinner.innerHTML = `<span class="fa fa-sync-alt fa-spin fa-2x fa-fw" aria-label="Loading..."></span>`;

    document.querySelector('main').appendChild(loadingSpinner);
  }

  function removeLoadingSpinner() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    loadingSpinner ? document.querySelector('main').removeChild(loadingSpinner) : null;
  }

  function renderErrorMessage(messageText) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message', 'error-message');
    errorMessage.innerHTML = `<span class="fa fa-exclamation-circle fa-lg fa-fw"></span> ${messageText}`;

    document.querySelector('main').appendChild(errorMessage);
  }

  return {
    renderWeatherResults,
    toggleTempType,
    renderLoadingSpinner,
    removeLoadingSpinner,
    renderErrorMessage
  };
})();

export { ResultsContainer };
