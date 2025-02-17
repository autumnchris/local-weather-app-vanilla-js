import CurrentWeatherDetails from './CurrentWeatherDetails';
import SwitchButton from './SwitchButton';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import getTempType from '../utils/getTempType';

class WeatherResults {
  constructor() {
    this.currentWeatherDetails = new CurrentWeatherDetails();
    this.switchButton = new SwitchButton();
    this.hourlyForecast = new HourlyForecast();
    this.dailyForecast = new DailyForecast();
  }

  // DOM methods
  renderTempTypeChange(weatherData, tempType) {
    const switchButton = document.querySelector('.switch-button');
    switchButton.classList.add(tempType);
    switchButton.classList.remove(tempType === 'f' ? 'c' : 'f');
    switchButton.setAttribute('aria-label', `switch to ${tempType === 'f' ? 'celsius' : 'fahrenheit'}`);
    switchButton.innerHTML = `&deg;${tempType.toUpperCase()}`;

    const currentTemp = document.querySelector('.current-weather .temp');
    currentTemp.innerHTML = `${tempType === 'f' ? Math.round(weatherData.currentWeather.temp) : Math.round((weatherData.currentWeather.temp - 32) * (5/9))}&deg;${tempType.toUpperCase()}`;

    const currentFeelsLikeTemp = document.querySelector('.current-weather-details .feels-like-temp');
    currentFeelsLikeTemp.innerHTML = `${tempType === 'f' ? Math.round(weatherData.currentWeather.feelsLikeTemp) : Math.round((weatherData.currentWeather.feelsLikeTemp - 32) * (5/9))}&deg;${tempType.toUpperCase()}`;

    this.hourlyForecast.removeHourlyForecast('.weather-content .col-2');
    this.dailyForecast.removeDailyForecast('.weather-content .col-2');
    this.hourlyForecast.renderHourlyForecast(weatherData.hourlyForecast, tempType, weatherData.timezoneOffset, '.weather-content .col-2');
    this.dailyForecast.renderDailyForecast(weatherData.dailyForecast, tempType, weatherData.timezoneOffset, '.weather-content .col-2');
  }

  renderCityLocation(city, location) {
    const cityLocation = document.createElement('div');
    cityLocation.classList.add('location');
    cityLocation.innerHTML = `${city}`;

    if (typeof location === 'string') {
      document.querySelector(location).appendChild(cityLocation);
    }
    else if (Array.isArray(location)) {
      document.querySelector(location[0]).insertBefore(cityLocation, document.querySelector(location[1]));
    }
  }

  removeCityLocation(location) {
    const cityLocation = document.querySelector(`${location} .location`);
    cityLocation ? document.querySelector(location).removeChild(cityLocation) : null;
  }

  renderWeatherResults(weatherData, location) {
    const weatherResults = document.createElement('div');
    weatherResults.classList.add('weather-content');
    weatherResults.innerHTML = `
      <div class="col col-1">
        <div class="current-weather">
          <div class="temp">${getTempType() === 'f' ? Math.round(weatherData.currentWeather.temp) : Math.round((weatherData.currentWeather.temp - 32) * (5/9))}&deg;${getTempType().toUpperCase()}</div>
          <div class="wi wi-owm${weatherData.currentWeather.isNight ? '-night' : ''}-${weatherData.currentWeather.weatherIcon} weather-icon" aria-hidden="true"></div>
          <div class="weather-summary weather-description">${weatherData.currentWeather.weatherSummary}</div>
        </div>
      </div>
      <div class="col col-2"></div>
    `;
    document.querySelector(location).appendChild(weatherResults);
    this.currentWeatherDetails.renderCurrentWeatherDetails(weatherData, '.weather-content .col-1');
    this.hourlyForecast.renderHourlyForecast(weatherData.hourlyForecast, getTempType(), weatherData.timezoneOffset, '.weather-content .col-2');
    this.dailyForecast.renderDailyForecast(weatherData.dailyForecast, getTempType(), weatherData.timezoneOffset, '.weather-content .col-2');
    this.renderCityLocation(weatherData.city, ['main', '.weather-content']);
    this.switchButton.renderSwitchButton(getTempType(), ['main', '.weather-content']);
  }

  removeWeatherResults(location) {
    const weatherResults = document.querySelector(`${location} .weather-content`);
    weatherResults ? document.querySelector(location).removeChild(weatherResults) : null;
    this.removeCityLocation('main');
    this.switchButton.removeSwitchButton('main');
  }
}

export default WeatherResults;