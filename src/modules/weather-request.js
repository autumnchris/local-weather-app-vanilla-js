import axios from 'axios';
import { ResultsContainer } from './Results-Container';

const WeatherRequest = (() => {
  const options = {
    timeout: 18000
  };

  function getSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    let apiData = null;

    function fetchCurrentWeatherData() {
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`);
    }

    function fetchForecastData() {
      return axios.get(`https://api.openweathermap.org/data/2.5/onecall?&lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`);
    }

    axios.all([fetchCurrentWeatherData(), fetchForecastData()]).then(axios.spread((currentWeatherData, forecastData) => {
      apiData = {
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
      ResultsContainer.removeLoadingSpinner();
      ResultsContainer.renderWeatherResults(apiData);
    })).catch(() =>{
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
    getError,
    options
  };
})();

export { WeatherRequest };
