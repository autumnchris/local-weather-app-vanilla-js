import axios from 'axios';

export default function fetchCurrentWeatherData(lat, lon) {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`);
}