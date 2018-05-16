function getSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const geocodingAPIKey = 'AIzaSyDF-M0gmMFMWJ2zO0tfKNs8Y0zbRUJaACA';
  const weatherAPIKey = '6e76605e3f2672147d041fcb0df33e81';

  const geocodingAPI = $.ajax({
    type: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${geocodingAPIKey}`
  });

  const weatherAPI = $.ajax({
    dataType: 'jsonp',
    url: `https://api.darksky.net/forecast/${weatherAPIKey}/${lat},${lng}`
  });

  $.when(geocodingAPI, weatherAPI).done((loc, weather) => {
    const location = loc[0].results[0].address_components[3].long_name;
    const currentData = {
      icon: `wi wi-forecast-io-${weather[0].currently.icon}`,
      summary: weather[0].currently.summary,
      tempF: `${Math.round(weather[0].currently.temperature)}&deg;F`,
      tempC: `${Math.round((weather[0].currently.temperature - 32) * (5/9))}&deg;C`
    };
    const currentWeather = `<div class="location">${location}</div>
    <div class="temp">${currentData.tempF}</div>
    <div class="${currentData.icon} weather-icon"></div>
    <div class="weather">${currentData.summary}</div>`;
    $('.current-weather').html(currentWeather);

    let i;

    for (i = 0; i < 24; i++) {
      const hourlyData = {
        icon: weather[0].hourly.data[i].icon,
        tempF: `${Math.round(weather[0].hourly.data[i].temperature)}&deg;`,
        tempC: `${Math.round((weather[0].hourly.data[i].temperature - 32) * (5/9))}&deg;`,
        time: new Date(weather[0].hourly.data[i].time * 1000).getHours()
      };

      if (hourlyData.time < 12) {

        if (hourlyData.time === 0) {
          hourlyData.time += 12;
        }
        hourlyData.time += 'AM';
      }
      else {

        if (hourlyData.time > 12) {
          hourlyData.time -= 12;
        }
        hourlyData.time += 'PM';
      }
      const hourlyForecast = `<tr>
        <td>${hourlyData.time}</td>
        <td>
          <span class="wi wi-forecast-io-${hourlyData.icon}"></span>
          <span class="sr-only">${hourlyData.icon}</span>
        </td>
        <td>${hourlyData.tempF}</td>
        <td>${hourlyData.tempC}</td>
      </tr>`;
      $('.hourly-forecast tbody').append(hourlyForecast);
    }

    for (i = 0; i < 5; i++) {
      const daysOfWeek = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ];
      const dailyData = {
        day: daysOfWeek[new Date(weather[0].daily.data[i].time * 1000).getDay()],
        highLowF: `${Math.round(weather[0].daily.data[i].temperatureMax)}&deg;/${Math.round(weather[0].daily.data[i].temperatureMin)}&deg;`,
        highLowC: `${Math.round((weather[0].daily.data[i].temperatureMax - 32) * (5/9))}&deg;/${Math.round((weather[0].daily.data[i].temperatureMin - 32) * (5/9))}&deg;`,
        icon: weather[0].daily.data[i].icon,
        summary: weather[0].daily.data[i].summary
      };
      const dailyForecast = `<tr>
        <td>${dailyData.day}</td>
        <td>${dailyData.highLowF}</td>
        <td>${dailyData.highLowC}</td>
        <td>
          <span class="wi wi-forecast-io-${dailyData.icon}"></span>
          <span class="sr-only">${dailyData.icon}</span>
        </td>
        <td>${dailyData.summary}</td>
      </tr>`;
      $('.daily-forecast tbody').append(dailyForecast);
    }

    $('.to-celsius').click(() => {
      $('.temp').html(currentData.tempC);
      $('.hourly-forecast tbody tr td:nth-child(3)').css('display', 'none');
      $('.hourly-forecast tbody tr td:nth-child(4)').css('display', 'table-row');
      $('.daily-forecast tbody tr td:nth-child(2)').css('display', 'none');
      $('.daily-forecast tbody tr td:nth-child(3)').css('display', 'table-cell');
    });

    $('.to-fahrenheit').click(() => {
      $('.temp').html(currentData.tempF);
      $('.hourly-forecast tbody tr td:nth-child(3)').css('display', 'table-row');
      $('.hourly-forecast tbody tr td:nth-child(4)').css('display', 'none');
      $('.daily-forecast tbody tr td:nth-child(2)').css('display', 'table-cell');
      $('.daily-forecast tbody tr td:nth-child(3)').css('display', 'none');
    });

    $('.spinner').css('display', 'none');
    $('.results').css('display', 'block');
  }).fail(() => {
    $('.well').html('<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> Unable to load current weather.</div>');
  });
}

function getError(err) {
  $('.well').html(`<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> ${err.message}.</div>`);
}

navigator.geolocation.getCurrentPosition(getSuccess, getError);
