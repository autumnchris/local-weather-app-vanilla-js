import axios from 'axios';

export default function fetchForecastData(lat, lon) {
  return axios.get(`https://api.openweathermap.org/data/2.5/onecall?&lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`);
}