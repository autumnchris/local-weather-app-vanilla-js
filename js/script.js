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
    const data = {
      location: loc[0].results[0].address_components[3].long_name,
      current: {
        icon: `wi wi-forecast-io-${weather[0].currently.icon}`,
        summary: weather[0].currently.summary,
        tempF: `${Math.round(weather[0].currently.temperature)}&deg;F`,
        tempC: `${Math.round((weather[0].currently.temperature - 32) * (5/9))}&deg;C`
      },
      hourly: {
        icon: null,
        tempF: null,
        tempC: null,
        time: null,
        forecast: null
      },
      daily: {
        daysOfWeek: [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ],
        day: null,
        highLowF: null,
        highLowC: null,
        icon: null,
        summary:null,
        forecast: null
      }
    };
    const currentWeather = `<div class="location">${data.location}</div>
    <div class="temp">${data.current.tempF}</div>
    <div class="${data.current.icon} weather-icon"></div>
    <div class="weather">${data.current.summary}</div>`;
    $('.current-weather').html(currentWeather);

    let i;

    for (i = 0; i < 24; i++) {
      data.hourly.icon = weather[0].hourly.data[i].icon;
      data.hourly.tempF = `${Math.round(weather[0].hourly.data[i].temperature)}&deg;`;
      data.hourly.tempC = `${Math.round((weather[0].hourly.data[i].temperature - 32) * (5/9))}&deg;`;
      data.hourly.time = new Date(weather[0].hourly.data[i].time * 1000).getHours();

      if (data.hourly.time < 12) {

        if (data.hourly.time === 0) {
          data.hourly.time += 12;
        }
        data.hourly.time += 'AM';
      }
      else {

        if (data.hourly.time > 12) {
          data.hourly.time -= 12;
        }
        data.hourly.time += 'PM';
      }
      data.hourly.forecast = `<tr>
        <td>${data.hourly.time}</td>
        <td>
          <span class="wi wi-forecast-io-${data.hourly.icon}"></span>
          <span class="sr-only">${data.hourly.icon}</span>
        </td>
        <td>${data.hourly.tempF}</td>
        <td>${data.hourly.tempC}</td>
      </tr>`;
      $('.hourly-forecast tbody').append(data.hourly.forecast);
    }

    for (i = 0; i < 5; i++) {
      data.daily.day = data.daily.daysOfWeek[new Date(weather[0].daily.data[i].time * 1000).getDay()];
      data.daily.highLowF = `${Math.round(weather[0].daily.data[i].temperatureMax)}&deg;/${Math.round(weather[0].daily.data[i].temperatureMin)}&deg;`;
      data.daily.highLowC = `${Math.round((weather[0].daily.data[i].temperatureMax - 32) * (5/9))}&deg;/${Math.round((weather[0].daily.data[i].temperatureMin - 32) * (5/9))}&deg;`;
      data.daily.icon = weather[0].daily.data[i].icon;
      data.daily.summary = weather[0].daily.data[i].summary;

      data.daily.forecast = `<tr>
        <td>${data.daily.day}</td>
        <td>${data.daily.highLowF}</td>
        <td>${data.daily.highLowC}</td>
        <td>
          <span class="wi wi-forecast-io-${data.daily.icon}"></span>
          <span class="sr-only">${data.daily.icon}</span>
        </td>
        <td>${data.daily.summary}</td>
      </tr>`;
      $('.daily-forecast tbody').append(data.daily.forecast);
    }

    $('.to-celsius').click(() => {
      $('.temp').html(data.current.tempC);
      $('.hourly-forecast tbody tr td:nth-child(3)').css('display', 'none');
      $('.hourly-forecast tbody tr td:nth-child(4)').css('display', 'table-row');
      $('.daily-forecast tbody tr td:nth-child(2)').css('display', 'none');
      $('.daily-forecast tbody tr td:nth-child(3)').css('display', 'table-cell');
    });

    $('.to-fahrenheit').click(() => {
      $('.temp').html(data.current.tempF);
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
