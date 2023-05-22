import moment from 'moment';

class DailyForecast {
  // DOM methods
  renderDailyForecast(dailyForecastData, tempType, timezoneOffset, location) {
    const dailyForecast = document.createElement('table');
    dailyForecast.classList.add('daily-forecast');
    dailyForecast.innerHTML = `
      <tbody>${dailyForecastData.slice(0, 5).map(day => {
        return `
          <tr>
            <td>${moment(day.dt * 1000).utcOffset(timezoneOffset).format('ddd')}</td>
            <td>${tempType === 'f' ? Math.round(day.temp.max) : Math.round((day.temp.max - 32) * (5/9))}&deg;/${tempType === 'f' ? Math.round(day.temp.min) : Math.round((day.temp.min - 32) * (5/9))}&deg;</td>
            <td class="weather-description"><span class="wi wi-owm-${day.weather[0].id} weather-icon" aria-hidden="true"></span> ${day.weather[0].description}</td>
          </tr>
        `;
      }).join('')}</tbody
    `;
    document.querySelector(location).appendChild(dailyForecast);
  }

  removeDailyForecast(location) {
    const dailyForecast = document.querySelector(`${location} .daily-forecast`);
    dailyForecast ? document.querySelector(location).removeChild(dailyForecast) : null;
  }
}

export default DailyForecast;