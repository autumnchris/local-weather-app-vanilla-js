function getSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const geocodingAPIKey = 'AIzaSyDF-M0gmMFMWJ2zO0tfKNs8Y0zbRUJaACA';
  const weatherAPIKey = '6e76605e3f2672147d041fcb0df33e81';
  let tempType = 'F';

  const geocodingAPI = $.ajax({
    type: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${geocodingAPIKey}`
  });

  const weatherAPI = $.ajax({
    dataType: 'jsonp',
    url: `https://api.darksky.net/forecast/${weatherAPIKey}/${lat},${lng}`
  });

  $.when(geocodingAPI, weatherAPI).done((loc, weather) => {
    let hours = weather[0].hourly.data;
    let days = weather[0].daily.data;

    $('.switch').html(`&deg;F`);
    $('.location').html(loc[0].results[0].address_components[3].long_name);
    $('.temp').html(`${Math.round(weather[0].currently.temperature)}&deg;F`);
    $('.weather-icon').attr('class', `wi wi-forecast-io-${weather[0].currently.icon} weather-icon`);
    $('.weather').html(weather[0].currently.summary);
    $('.sunrise').html(moment(weather[0].daily.data[0].sunriseTime * 1000).format('h:mm A'));
    $('.sunset').html(moment(weather[0].daily.data[0].sunsetTime * 1000).format('h:mm A'));


    hours = hours.filter(hour => {
      return hours.indexOf(hour) < 24;
    });

    hours.map(hour => {
      let tableRow = `<tr>
          <td>${moment(hour.time * 1000).format('hA')}</td>
          <td class="wi wi-forecast-io-${hour.icon}"></td>
          <td>
            <span>${Math.round(hour.temperature)}&deg;</span>
            <span>${Math.round((hour.temperature - 32) * (5/9))}&deg;</span>
          </td>
        </tr>`;
      $('.hourly-forecast tbody').append(tableRow);
    });

    days = days.filter(day => {
      return days.indexOf(day) < 5;
    });

    days.map(day => {
      let tableRow = `<tr>
        <td>${moment(day.time * 1000).format('ddd')}</td>
        <td>
          <span>${Math.round(day.temperatureMax)}&deg;/${Math.round(day.temperatureMin)}&deg;</span>
          <span>${Math.round((day.temperatureMax - 32) * (5/9))}&deg;/${Math.round((day.temperatureMin - 32) * (5/9))}&deg;</span>
        </td>
        <td class="wi wi-forecast-io-${day.icon}"></td>
        <td>${day.summary}</td>
      </tr>`;
      $('.daily-forecast tbody').append(tableRow);
    });

    $('.switch').click(() => {

      if(tempType === 'F') {
        tempType = 'C';
        $('.temp').html(`${Math.round((weather[0].currently.temperature - 32) * (5/9))}&deg;C`);
        $('.switch').html(`&deg;C`).attr('class', 'switch celsius');
        $('.hourly-forecast td:last-child span:first-child').css('display', 'none');
        $('.hourly-forecast td:last-child span:last-child').css('display', 'inline');
        $('.daily-forecast td:nth-child(2) span:first-child').css('display', 'none');
        $('.daily-forecast td:nth-child(2) span:last-child').css('display', 'inline');
      }
      else {
        tempType = 'F';
        $('.temp').html(`${Math.round(weather[0].currently.temperature)}&deg;F`);
        $('.switch').html(`&deg;F`).attr('class', 'switch fahrenheit');
        $('.hourly-forecast td:last-child span:first-child').css('display', 'inline');
        $('.hourly-forecast td:last-child span:last-child').css('display', 'none');
        $('.daily-forecast td:nth-child(2) span:first-child').css('display', 'inline');
        $('.daily-forecast td:nth-child(2) span:last-child').css('display', 'none');
      }
    });

    $('.spinner').css('display', 'none');
    $('.card').css('display', 'grid');
  }).fail(() => {
    $('.spinner').css('display', 'none');
    $('.error-message').html('<span class="fa fa-exclamation-circle fa-lg fa-fw"></span> Unable to load current weather.').css('display', 'block');
  });
}

function getError(err) {
  $('.spinner').css('display', 'none');
  $('.error-message').html(`<span class="fa fa-exclamation-circle fa-lg fa-fw"></span> ${err.message}.`).css('display', 'block');
}

navigator.geolocation.getCurrentPosition(getSuccess, getError);
