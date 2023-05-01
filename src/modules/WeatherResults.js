import SunriseSunsetTimes from './SunriseSunsetTimes';
import SwitchButton from './SwitchButton';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import getTempType from '../utils/getTempType';

class WeatherResults {
  constructor() {
    this.sunriseSunsetTimes = new SunriseSunsetTimes();
    this.switchButton = new SwitchButton();
    this.hourlyForecast = new HourlyForecast();
    this.dailyForecast = new DailyForecast();
  }

  // DOM methods
  renderTempTypeChange(weatherData, tempType) {
    const switchButton = document.querySelector('.switch-button');
    switchButton.classList.add(tempType);
    switchButton.classList.remove(tempType === 'f' ? 'c' : 'f');
    switchButton.innerHTML = `&deg;${tempType.toUpperCase()}`;

    const currentTemp = document.querySelector('.current-weather .temp');
    currentTemp.innerHTML = `${tempType === 'f' ? weatherData.currentWeather.fahrenheitTemp : weatherData.currentWeather.celsiusTemp}&deg;${tempType.toUpperCase()}`;

    this.hourlyForecast.removeHourlyForecast('.weather-content .col-2');
    this.dailyForecast.removeDailyForecast('.weather-content .col-2');
    this.hourlyForecast.renderHourlyForecast(weatherData.hourlyForecast, tempType, '.weather-content .col-2');
    this.dailyForecast.renderDailyForecast(weatherData.dailyForecast, tempType, '.weather-content .col-2');
  }

  renderWeatherResults(weatherData, location) {
    const weatherResults = document.createElement('div');
    weatherResults.classList.add('weather-content');
    weatherResults.innerHTML = `
      <div class="col col-1">
        <div class="location">${weatherData.city}</div>
        <div class="current-weather">
          <div class="temp">${getTempType() === 'f' ? weatherData.currentWeather.fahrenheitTemp : weatherData.currentWeather.celsiusTemp}&deg;${getTempType().toUpperCase()}</div>
          <div class="wi wi-owm${weatherData.currentWeather.isNight ? '-night' : ''}-${weatherData.currentWeather.weatherIcon} weather-icon" aria-hidden="true"></div>
          <div class="weather-summary weather-description">${weatherData.currentWeather.weatherSummary}</div>
        </div>
      </div>
      <div class="col col-2"></div>
    `;
    document.querySelector(location).appendChild(weatherResults);
    this.sunriseSunsetTimes.renderSunriseSunsetTimes(weatherData, '.weather-content .col-1');
    this.switchButton.renderSwitchButton(getTempType(), '.weather-content .col-1');
    this.hourlyForecast.renderHourlyForecast(weatherData.hourlyForecast, getTempType(), '.weather-content .col-2');
    this.dailyForecast.renderDailyForecast(weatherData.dailyForecast, getTempType(), '.weather-content .col-2');
  }
}

export default WeatherResults;