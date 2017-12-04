function success(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  var weatherAPIKey = '6e76605e3f2672147d041fcb0df33e81';

  var geocodingAPI = $.ajax({
    type: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng
  });

  var weatherAPI = $.ajax({
    dataType: 'jsonp',
    url: 'https://api.darksky.net/forecast/' + weatherAPIKey + '/' + lat + ',' + lng
  });

  $.when(geocodingAPI, weatherAPI).done(function(loc, weatherData) {

    var location = loc[0].results[0].address_components[3].long_name;
    var tempF = Math.round(weatherData[0].currently.temperature) + '&deg;F';
    var tempC = Math.round((weatherData[0].currently.temperature - 32) * (5/9)) + '&deg;C';
    var weatherIcon = 'wi wi-forecast-io-' + weatherData[0].currently.icon;
    var weather = weatherData[0].currently.summary;
    var currentWeather = '<div id="location">' + location + '</div>' +
    '<div id="temp">' + tempF + '</div>' +
    '<div>' +
      '<span class="' + weatherIcon + '" id="weather-icon"></span>' +
    '</div>' +
    '<div id="weather">' + weather + '</div>';
    $('#current-weather').html(currentWeather);

    for(var i = 0; i < 24; i++) {
      var hourOfDay = new Date(weatherData[0].hourly.data[i].time * 1000).getHours();
      if (hourOfDay < 12) {
        if( hourOfDay === 0) {
          hourOfDay += 12;
        }
        hourOfDay += 'AM';
      }
      else {
        if(hourOfDay > 12) {
          hourOfDay -= 12;
        }
        hourOfDay += 'PM';
      }
      var hourlyIcon = weatherData[0].hourly.data[i].icon;
      var hourlyTempF = Math.round(weatherData[0].hourly.data[i].temperature) + '&deg;';
      var hourlyTempC = Math.round((weatherData[0].hourly.data[i].temperature - 32) * (5/9)) + '&deg;';
      var hourlyForecast = '<tr>' +
        '<td>' + hourOfDay + '</td>' +
        '<td>' +
          '<span class="wi wi-forecast-io-' + hourlyIcon + '"></span>' +
          '<span class="sr-only">' + hourlyIcon + '</span>' +
        '</td>' +
        '<td>' + hourlyTempF + '</td>' +
        '<td>' + hourlyTempC + '</td>' +
      '</tr>';
      $('#hourly-forecast tbody').append(hourlyForecast);
    }

    for(var i = 0; i < 5; i++) {
      var days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ];
      var dayOfWeek = days[new Date(weatherData[0].daily.data[i].time * 1000).getDay()];
      var highLowF = Math.round(weatherData[0].daily.data[i].temperatureMax) + '&deg;/' + Math.round(weatherData[0].daily.data[i].temperatureMin) + '&deg;';
      var highLowC = Math.round((weatherData[0].daily.data[i].temperatureMax - 32) * (5/9)) + '&deg;/' + Math.round((weatherData[0].daily.data[i].temperatureMin - 32) * (5/9)) + '&deg;';
      var dailyIcon = weatherData[0].daily.data[i].icon;
      var dailySummary = weatherData[0].daily.data[i].summary;
      var dailyForecast = '<tr>' +
        '<td>' + dayOfWeek + '</td>' +
        '<td>' + highLowF + '</td>' +
        '<td>' + highLowC + '</td>' +
        '<td>' +
          '<span class="wi wi-forecast-io-' + dailyIcon + '"></span>' +
          '<span class="sr-only">' + dailyIcon + '</span>' +
        '</td>' +
        '<td>' + dailySummary + '</td>' +
      '</tr>';
      $('#daily-forecast tbody').append(dailyForecast);
    }

    $('#to-celsius').click(function() {
      $('#temp').html(tempC);
      $('#hourly-forecast tbody tr td:nth-child(3)').css('display', 'none');
      $('#hourly-forecast tbody tr td:nth-child(4)').css('display', 'table-row');
      $('#daily-forecast tbody tr td:nth-child(2)').css('display', 'none');
      $('#daily-forecast tbody tr td:nth-child(3)').css('display', 'table-cell');
    });

    $('#to-fahrenheit').click(function() {
      $('#temp').html(tempF);
      $('#hourly-forecast tbody tr td:nth-child(3)').css('display', 'table-row');
      $('#hourly-forecast tbody tr td:nth-child(4)').css('display', 'none');
      $('#daily-forecast tbody tr td:nth-child(2)').css('display', 'table-cell');
      $('#daily-forecast tbody tr td:nth-child(3)').css('display', 'none');
    });

    $('#spinner').css('display', 'none');
    $('#results').css('display', 'block');
  }).fail(function() {
    $('.well').html('<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> Unable to load current weather.</div>');
  });
}

function error(err) {
  $('.well').html('<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> ' + err.message + '.</div>');
}

navigator.geolocation.getCurrentPosition(success, error);
