import { WeatherRequest } from './weather-request';
import { ResultsContainer } from './results-container';

const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = `
    <header>
      <h1>View your local weather</h1>
    </header>
    <main></main>
    <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()} | Powered by <a href="https://darksky.net/poweredby" target="_blank">Dark Sky</a></footer>`;

    ResultsContainer.renderLoadingSpinner();
    navigator.geolocation.getCurrentPosition(WeatherRequest.getSuccess, WeatherRequest.getError);

    document.addEventListener('click', () => {
       const element = event.target;
       element.matches('.switch-button') ? ResultsContainer.toggleTempType() : null;
    });
  }

  return {
    renderApp
  };
})();

export { App };
