import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import WeatherResults from './WeatherResults';
import ErrorMessage from './ErrorMessage';
import PageLoadContent from './PageLoadContent';
import SearchFormModal from './SearchFormModal';
import fetchCurrentWeatherData from '../utils/fetchCurrentWeatherData';
import fetchForecastData from '../utils/fetchForecastData';
import getTempType from '../utils/getTempType';

class WeatherRequest {
  constructor() {
    this.header = new Header();
    this.loadingSpinner = new LoadingSpinner();
    this.weatherResults = new WeatherResults();
    this.errorMessage = new ErrorMessage();
    this.pageLoadContent = new PageLoadContent();
    this.searchFormModal = new SearchFormModal();
    this.weatherData = null;
  }

  resetWeatherResults() {
    this.weatherData = null;
    this.searchFormModal.removeSearchFormModal('main');
    this.header.removePageLoadHeader('#app');
    this.header.removeResultsHeader('#app');
    this.pageLoadContent.removePageLoadContent('main');
    this.weatherResults.removeWeatherResults('main');
    this.header.renderResultsHeader(['#app', 'main']);
    this.loadingSpinner.renderLoadingSpinner('main');
  }

  selectCity(lat, lon) {
    this.resetWeatherResults();
    this.fetchWeatherResults(lat, lon);
  }

  fetchWeatherResults(lat, lon) {
    Promise.all([
      fetchCurrentWeatherData(lat, lon),
      fetchForecastData(lat, lon)
    ]).then(([
      currentWeatherData,
      forecastData
    ]) => {
      this.weatherData = {
        city: currentWeatherData.data.name,
        timezoneOffset: Math.floor(currentWeatherData.data.timezone / 60),
        currentWeather: {
          temp: currentWeatherData.data.main.temp,
          weatherSummary: currentWeatherData.data.weather[0].description,
          weatherIcon: currentWeatherData.data.weather[0].id,
          feelsLikeTemp: currentWeatherData.data.main.feels_like,
          humidity: currentWeatherData.data.main.humidity,
          uvIndex: forecastData.data.current.uvi,
          sunriseTime: currentWeatherData.data.sys.sunrise,
          sunsetTime: currentWeatherData.data.sys.sunset,
          isNight: currentWeatherData.data.weather[0].icon.slice(-1) === 'n' ? true : false
        },
        hourlyForecast: forecastData.data.hourly,
        dailyForecast: forecastData.data.daily
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