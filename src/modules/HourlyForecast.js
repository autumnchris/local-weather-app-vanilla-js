import moment from 'moment';

class HourlyForecast {
  // DOM methods
  renderHourlyForecast(hourlyForecastData, tempType, timezoneOffset, location) {
    const hourlyForecast = document.createElement('table');
    hourlyForecast.classList.add('hourly-forecast');
    hourlyForecast.innerHTML = `
      <tbody>${hourlyForecastData.slice(0, 24).map(hour => {
        return `
          <tr>
            <td>${moment(hour.dt * 1000).utcOffset(timezoneOffset).format('hA')}</td>
            <td class="wi wi-owm${hour.weather[0].icon.slice(-1) === 'n' ? '-night' : ''}-${hour.weather[0].id} weather-icon" aria-label="${hour.weather[0].description}"></td>
            <td>${tempType === 'f' ? Math.round(hour.temp) : Math.round((hour.temp - 32) * (5/9))}&deg;</td>
          </tr>
        `;
      }).join('')}</tbody>
    `;
    document.querySelector(location).appendChild(hourlyForecast);
  }

  removeHourlyForecast(location) {
    const hourlyForecast = document.querySelector(`${location} .hourly-forecast`);
    hourlyForecast ? document.querySelector(location).removeChild(hourlyForecast) : null;
  }
}

export default HourlyForecast;