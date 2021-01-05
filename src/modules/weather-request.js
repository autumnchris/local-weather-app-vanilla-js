import axios from 'axios-jsonp-pro';
import { ResultsContainer } from './results-container';

const WeatherRequest = (() => {

  function getSuccess(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    let apiData = null;

    function fetchGeocodingAPI() {
      return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GEOCODING_API_KEY}`);
    }

    function fetchWeatherAPI() {
      return axios.jsonp(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${lng}`);
    }

    axios.all([fetchGeocodingAPI(), fetchWeatherAPI()])
      .then(axios.spread((geocodingData, weatherData) => {
        apiData = {
          city: geocodingData.data.results[0].address_components[3].long_name,
          currentWeather: {
            temp: weatherData.currently.temperature,
            weatherSummary: weatherData.currently.summary,
            weatherIcon: weatherData.currently.icon
          },
          sunriseTime: weatherData.daily.data[0].sunriseTime,
          sunsetTime: weatherData.daily.data[0].sunsetTime,
          hourlyForecast: weatherData.hourly.data,
          dailyForecast: weatherData.daily.data
        };
        ResultsContainer.removeLoadingSpinner();
        ResultsContainer.renderWeatherResults(apiData);
      })).catch(() => {
        ResultsContainer.removeLoadingSpinner();
        ResultsContainer.renderErrorMessage('Unable to load current weather at this time.');
      });
  }

  function getError(err) {
    ResultsContainer.removeLoadingSpinner();
    ResultsContainer.renderErrorMessage(err.message);
  }

  return {
    getSuccess,
    getError
  };
})();

export { WeatherRequest };
