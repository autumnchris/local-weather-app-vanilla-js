import moment from 'moment';

class SunriseSunsetTimes {
  // DOM methods
  renderSunriseSunsetTimes(weatherData, location) {
    const sunriseSunsetTimes = document.createElement('table');
    sunriseSunsetTimes.classList.add('sunrise-sunset');
    sunriseSunsetTimes.innerHTML = `
      <thead>
        <tr>
          <th scope="col"><span class="wi wi-sunrise wi-fw" aria-hidden="true"></span> Sunrise</th>
          <th scope="col"><span class="wi wi-sunset wi-fw" aria-hidden="true"></span> Sunset</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${moment(weatherData.sunriseTime * 1000).format('h:mm A')}</td>
          <td>${moment(weatherData.sunsetTime * 1000).format('h:mm A')}</td>
        </tr>
      </tbody>
    `;
    document.querySelector(location).appendChild(sunriseSunsetTimes);
  }
}

export default SunriseSunsetTimes;