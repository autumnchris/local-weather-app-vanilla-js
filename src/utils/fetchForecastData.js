import axios from 'axios';

export default function fetchForecastData(lat, lon) {
  return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`);
}