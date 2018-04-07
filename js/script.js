function getSuccess(position) {
  var lat = position.coords.latitude,
  lng = position.coords.longitude,
  geocodingAPIKey = 'AIzaSyDF-M0gmMFMWJ2zO0tfKNs8Y0zbRUJaACA',
  weatherAPIKey = '6e76605e3f2672147d041fcb0df33e81';

  var geocodingAPI = $.ajax({
    type: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + geocodingAPIKey
  });

  var weatherAPI = $.ajax({
    dataType: 'jsonp',
    url: 'https://api.darksky.net/forecast/' + weatherAPIKey + '/' + lat + ',' + lng
  });

  $.when(geocodingAPI, weatherAPI).done(function(loc, weatherData) {
    var i,
    hourOfDay,
    hourlyIcon,
    hourlyTempF,
    hourlyTempC,
    hourlyForecast,
    days,
    dayOfWeek,
    highLowF,
    highLowC,
    dailyIcon,
    dailySummary,
    dailyForecast,
    location = loc[0].results[0].address_components[3].long_name,
    tempF = Math.round(weatherData[0].currently.temperature) + '&deg;F',
    tempC = Math.round((weatherData[0].currently.temperature - 32) * (5/9)) + '&deg;C',
    weatherIcon = 'wi wi-forecast-io-' + weatherData[0].currently.icon,
    weather = weatherData[0].currently.summary,
    currentWeather = '<div class="location">' + location + '</div>' +
    '<div class="temp">' + tempF + '</div>' +
    '<div class="' + weatherIcon + ' weather-icon"></div>' +
    '<div class="weather">' + weather + '</div>';
    $('.current-weather').html(currentWeather);

    for (i = 0; i < 24; i++) {
      hourOfDay = new Date(weatherData[0].hourly.data[i].time * 1000).getHours();

      if (hourOfDay < 12) {

        if ( hourOfDay === 0) {
          hourOfDay += 12;
        }
        hourOfDay += 'AM';
      }
      else {

        if (hourOfDay > 12) {
          hourOfDay -= 12;
        }
        hourOfDay += 'PM';
      }
      hourlyIcon = weatherData[0].hourly.data[i].icon;
      hourlyTempF = Math.round(weatherData[0].hourly.data[i].temperature) + '&deg;';
      hourlyTempC = Math.round((weatherData[0].hourly.data[i].temperature - 32) * (5/9)) + '&deg;';
      hourlyForecast = '<tr>' +
        '<td>' + hourOfDay + '</td>' +
        '<td>' +
          '<span class="wi wi-forecast-io-' + hourlyIcon + '"></span>' +
          '<span class="sr-only">' + hourlyIcon + '</span>' +
        '</td>' +
        '<td>' + hourlyTempF + '</td>' +
        '<td>' + hourlyTempC + '</td>' +
      '</tr>';
      $('.hourly-forecast tbody').append(hourlyForecast);
    }

    for(i = 0; i < 5; i++) {
      days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ];
      dayOfWeek = days[new Date(weatherData[0].daily.data[i].time * 1000).getDay()];
      highLowF = Math.round(weatherData[0].daily.data[i].temperatureMax) + '&deg;/' + Math.round(weatherData[0].daily.data[i].temperatureMin) + '&deg;';
      highLowC = Math.round((weatherData[0].daily.data[i].temperatureMax - 32) * (5/9)) + '&deg;/' + Math.round((weatherData[0].daily.data[i].temperatureMin - 32) * (5/9)) + '&deg;';
      dailyIcon = weatherData[0].daily.data[i].icon;
      dailySummary = weatherData[0].daily.data[i].summary;
      dailyForecast = '<tr>' +
        '<td>' + dayOfWeek + '</td>' +
        '<td>' + highLowF + '</td>' +
        '<td>' + highLowC + '</td>' +
        '<td>' +
          '<span class="wi wi-forecast-io-' + dailyIcon + '"></span>' +
          '<span class="sr-only">' + dailyIcon + '</span>' +
        '</td>' +
        '<td>' + dailySummary + '</td>' +
      '</tr>';
      $('.daily-forecast tbody').append(dailyForecast);
    }

    $('.to-celsius').click(function() {
      $('.temp').html(tempC);
      $('.hourly-forecast tbody tr td:nth-child(3)').css('display', 'none');
      $('.hourly-forecast tbody tr td:nth-child(4)').css('display', 'table-row');
      $('.daily-forecast tbody tr td:nth-child(2)').css('display', 'none');
      $('.daily-forecast tbody tr td:nth-child(3)').css('display', 'table-cell');
    });

    $('.to-fahrenheit').click(function() {
      $('.temp').html(tempF);
      $('.hourly-forecast tbody tr td:nth-child(3)').css('display', 'table-row');
      $('.hourly-forecast tbody tr td:nth-child(4)').css('display', 'none');
      $('.daily-forecast tbody tr td:nth-child(2)').css('display', 'table-cell');
      $('.daily-forecast tbody tr td:nth-child(3)').css('display', 'none');
    });

    $('.spinner').css('display', 'none');
    $('.results').css('display', 'block');
  }).fail(function() {
    $('.well').html('<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> Unable to load current weather.</div>');
  });
}

function getError(err) {
  $('.well').html('<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> ' + err.message + '.</div>');
}

navigator.geolocation.getCurrentPosition(getSuccess, getError);
