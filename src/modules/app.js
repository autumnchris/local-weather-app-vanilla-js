import { WeatherRequest } from './weather-request';
import { ResultsContainer } from './results-container';

const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = `
    <header>
      <h1>View your local weather</h1>
    </header>
    <main></main>
    <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}</footer>`;

    ResultsContainer.renderLoadingSpinner();
    navigator.geolocation.getCurrentPosition(WeatherRequest.getSuccess, WeatherRequest.getError, WeatherRequest.options);

    document.addEventListener('click', event => {
       const element = event.target;
       element.matches('.switch-button') ? ResultsContainer.toggleTempType() : null;
    });
  }

  return {
    renderApp
  };
})();

export { App };
