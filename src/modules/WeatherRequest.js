import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import WeatherResults from './WeatherResults';
import ErrorMessage from './ErrorMessage';
import getTempType from '../utils/getTempType';

class WeatherRequest {
  constructor(headerInstance, pageLoadContentInstance, searchFormModalInstance) {
    this.header = headerInstance;
    this.loadingSpinner = new LoadingSpinner();
    this.weatherResults = new WeatherResults();
    this.errorMessage = new ErrorMessage();
    this.pageLoadContent = pageLoadContentInstance;
    this.searchFormModal = searchFormModalInstance;
    this.weatherData = null;
  }

  resetWeatherResults() {
    this.weatherData = null;
    this.searchFormModal.removeSearchFormModal('main');
    this.header.removePageLoadHeader('#app');
    this.header.removeResultsHeader('#app');
    this.pageLoadContent.removePageLoadContent('main');
    this.weatherResults.removeWeatherResults('main');
    this.errorMessage.removeErrorMessage('main');
    this.header.renderResultsHeader(['#app', 'main']);
    this.loadingSpinner.renderLoadingSpinner('main');
  }

  selectCity(lat, lon) {
    this.resetWeatherResults();
    this.fetchWeatherResults(lat, lon);
  }

  fetchWeatherResults(lat, lon) {
    axios.get(`https://autumnchris-local-weather-backend.onrender.com/weather?lat=${lat}&lon=${lon}`).then(response => {
      this.weatherData = {
        city: response.data.currentWeather.name,
        timezoneOffset: Math.floor(response.data.forecast.timezone_offset / 60),
        currentWeather: {
        temp: response.data.forecast.current.temp,
        weatherSummary: response.data.forecast.current.weather[0].description,
        weatherIcon: response.data.forecast.current.weather[0].id,
        feelsLikeTemp: response.data.forecast.current.feels_like,
        humidity: response.data.forecast.current.humidity,
        uvIndex: response.data.forecast.current.uvi,
        sunriseTime: response.data.forecast.current.sunrise,
        sunsetTime: response.data.forecast.current.sunset,
        isNight: response.data.forecast.current.weather[0].icon.slice(-1) === 'n' ? true : false
        },
        hourlyForecast: response.data.forecast.hourly,
        dailyForecast: response.data.forecast.daily
      };
      this.loadingSpinner.removeLoadingSpinner('main');
      this.weatherResults.renderWeatherResults(this.weatherData, 'main');
    }).catch(() => {
      this.loadingSpinner.removeLoadingSpinner('main');
      this.errorMessage.renderErrorMessage('Unable to load current weather at this time.', 'main');
    });
  }

  getGeolocation() {
    this.resetWeatherResults();
    const options = {
      timeout: 18000
    }
    navigator.geolocation.getCurrentPosition(this.getGeolocationSuccess.bind(this), this.getGeolocationError.bind(this), options);
  }

  getGeolocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    this.fetchWeatherResults(lat, lon);
  }

  getGeolocationError(err) {
    this.loadingSpinner.removeLoadingSpinner('main');
    this.errorMessage.renderErrorMessage(err.message, 'main');
  }

  toggleTempType() {
    let tempType = getTempType();

    if (tempType === 'f') {
      tempType = 'c';
    }
    else if (tempType === 'c') {
      tempType = 'f';
    }
    getTempType(tempType);
    this.weatherResults.renderTempTypeChange(this.weatherData, tempType);
  }
}

export default WeatherRequest;