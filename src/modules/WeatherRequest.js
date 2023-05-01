import LoadingSpinner from './LoadingSpinner';
import WeatherResults from './WeatherResults';
import ErrorMessage from './ErrorMessage';
import fetchCurrentWeatherData from '../utils/fetchCurrentWeatherData';
import fetchForecastData from '../utils/fetchForecastData';
import getTempType from '../utils/getTempType';

class WeatherRequest {
  constructor() {
    this.loadingSpinner = new LoadingSpinner();
    this.weatherResults = new WeatherResults();
    this.errorMessage = new ErrorMessage();
    this.weatherData = null;
  }

  getGeolocation() {
    const options = {
      timeout: 18000
    }
    navigator.geolocation.getCurrentPosition(this.getGeolocationSuccess.bind(this), this.getGeolocationError.bind(this), options);
  }

  getGeolocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    Promise.all([
      fetchCurrentWeatherData(lat, lon),
      fetchForecastData(lat, lon)
    ]).then(([
      currentWeatherData,
      forecastData
    ]) => {
      this.weatherData = {
        city: currentWeatherData.data.name,
        currentWeather: {
          fahrenheitTemp: Math.round(currentWeatherData.data.main.temp),
          celsiusTemp: Math.round((currentWeatherData.data.main.temp - 32) * (5/9)),
          weatherSummary: currentWeatherData.data.weather[0].description,
          weatherIcon: currentWeatherData.data.weather[0].id,
          isNight: currentWeatherData.data.weather[0].icon.slice(-1) === 'n' ? true : false
        },
        sunriseTime: currentWeatherData.data.sys.sunrise,
        sunsetTime: currentWeatherData.data.sys.sunset,
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