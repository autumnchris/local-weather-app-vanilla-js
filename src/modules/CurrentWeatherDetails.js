import moment from 'moment';
import getTempType from '../utils/getTempType';

class CurrentWeatherDetails {
  // DOM methods
  renderCurrentWeatherDetails(weatherData, location) {
    const currentWeatherDetails = document.createElement('table');
    currentWeatherDetails.classList.add('current-weather-details');
    currentWeatherDetails.innerHTML = `
      <tbody>
        <tr>
          <td>Feels Like</td>
          <td class="feels-like-temp">${getTempType() === 'f' ? Math.round(weatherData.currentWeather.feelsLikeTemp) : Math.round((weatherData.currentWeather.feelsLikeTemp - 32) * (5/9))}&deg;${getTempType().toUpperCase()}</td>
        </tr>
        <tr>
          <td>Humidity</td>
          <td>${weatherData.currentWeather.humidity}%</td>
        </tr>
        <tr>
          <td>UV Index</td>
          <td>${weatherData.currentWeather.uvIndex}</td>
        </tr>
        <tr>
          <td>Sunrise</td>
          <td>${moment(weatherData.currentWeather.sunriseTime * 1000).format('h:mm A')}</td>
        </tr>
        <tr>
          <td>Sunset</td>
          <td>${moment(weatherData.currentWeather.sunsetTime * 1000).format('h:mm A')}</td>
        </tr>
      </tbody>
    `;
    document.querySelector(location).appendChild(currentWeatherDetails);
  }
}

export default CurrentWeatherDetails;