import moment from 'moment';

const ResultsContainer = (() => {
  let tempType = JSON.parse(localStorage.getItem('tempType')) || 'f';
  let weatherData;

  function renderHourlyForecast(hourlyForecast) {
    document.querySelector('.hourly-forecast tbody').innerHTML = hourlyForecast.slice(0, 24).map(hour => {
      return `<tr>
        <td>${moment(hour.dt * 1000).format('hA')}</td>
        <td class="wi wi-owm${hour.weather[0].icon.slice(-1) === 'n' ? '-night' : ''}-${hour.weather[0].id} weather-icon"></td>
        <td>${tempType === 'f' ? Math.round(hour.temp) : Math.round((hour.temp - 32) * (5/9))}&deg;</td>
      </tr>`;
    }).join('');
  }

  function renderDailyForecast(dailyForecast) {
    document.querySelector('.daily-forecast tbody').innerHTML = dailyForecast.slice(0, 5).map(day => {
      return `<tr>
        <td>${moment(day.dt * 1000).format('ddd')}</td>
        <td>${tempType === 'f' ? Math.round(day.temp.max) : Math.round((day.temp.max - 32) * (5/9))}&deg;/${tempType === 'f' ? Math.round(day.temp.min) : Math.round((day.temp.min - 32) * (5/9))}&deg;</td>
        <td><span class="wi wi-owm-${day.weather[0].id} weather-icon"></span><span class="weather-description"> ${day.weather[0].description}</span></td>
      </tr>`;
    }).join('');
  }

  function renderWeatherResults(apiData) {
    weatherData = apiData;
    const weatherContent = document.createElement('div');
    weatherContent.classList.add('weather-content');
    weatherContent.innerHTML = `
    <div class="col">
      <div class="location">${weatherData.city}</div>
      <div class="current-weather">
        <div class="temp">${tempType === 'f' ? weatherData.currentWeather.fahrenheitTemp : weatherData.currentWeather.celsiusTemp}&deg;${tempType.toUpperCase()}</div>
        <div class="wi wi-owm${weatherData.currentWeather.isNight ? '-night' : ''}-${weatherData.currentWeather.weatherIcon} weather-icon"></div>
        <div class="weather-summary weather-description">${weatherData.currentWeather.weatherSummary}</div>
      </div>
      <table class="sunrise-sunset">
        <thead>
          <tr>
            <th scope="col"><span class="wi wi-sunrise wi-fw"></span> Sunrise</th>
            <th scope="col"><span class="wi wi-sunset wi-fw"></span> Sunset</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${moment(weatherData.sunriseTime * 1000).format('h:mm A')}</td>
            <td>${moment(weatherData.sunsetTime * 1000).format('h:mm A')}</td>
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
            <th scope="col">Day</th>
            <th scope="col">High/Low</th>
            <th scope="col">Weather</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>`;

    document.querySelector('main').appendChild(weatherContent);
    renderHourlyForecast(weatherData.hourlyForecast);
    renderDailyForecast(weatherData.dailyForecast);
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
    document.querySelector('.current-weather .temp').innerHTML = `${tempType === 'f' ? weatherData.currentWeather.fahrenheitTemp : weatherData.currentWeather.celsiusTemp}&deg;${tempType.toUpperCase()}`;
    renderHourlyForecast(weatherData.hourlyForecast);
    renderDailyForecast(weatherData.dailyForecast);
  }

  function renderLoadingSpinner() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingSpinner.setAttribute('aria-label', 'Loading...');

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
