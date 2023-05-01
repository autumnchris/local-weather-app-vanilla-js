import Header from './modules/Header';
import Footer from './modules/Footer';
import WeatherRequest from './modules/WeatherRequest';
import LoadingSpinner from './modules/LoadingSpinner';

class App {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.weatherRequest = new WeatherRequest();
    this.loadingSpinner = new LoadingSpinner();
    this.renderApp();
    this.events();
  }

    // Event listeners
    events() {
      document.addEventListener('click', event => {
        const element = event.target;
        element.matches('.switch-button') ? this.weatherRequest.toggleTempType() : null;
      });
    }

  // DOM methods
  renderApp() {
    this.header.renderHeader('#app');
    this.renderMain('#app');
    this.footer.renderFooter('#app');
    this.loadingSpinner.renderLoadingSpinner('main');
    this.weatherRequest.getGeolocation();
  }

  renderMain(location) {
    const main = document.createElement('main');
    document.querySelector(location).appendChild(main);
  }
}

export default App;