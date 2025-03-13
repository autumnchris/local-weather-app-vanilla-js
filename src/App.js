import Header from './modules/Header';
import Footer from './modules/Footer';
import WeatherRequest from './modules/WeatherRequest';
import PageLoadContent from './modules/PageLoadContent';
import SearchFormModal from './modules/SearchFormModal';

class App {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.pageLoadContent = new PageLoadContent();
    this.searchFormModal = new SearchFormModal();
    this.weatherRequest = new WeatherRequest(this.header, this.pageLoadContent, this.searchFormModal);
    this.renderApp();
  }

    // Event listeners
    events() {
      document.addEventListener('click', event => {
        const element = event.target;
        element.matches('.switch-button') ? this.weatherRequest.toggleTempType() : null;
        element.matches('.current-location-button') ? this.weatherRequest.getGeolocation() : null;
        element.matches('.city-search-button') ? this.searchFormModal.renderSearchFormModal('main') : null;
        element.matches('#modal .close-button') ? this.searchFormModal.removeSearchFormModal('main') : null;
        element.matches('#modal') ? this.searchFormModal.removeSearchFormModal('main'): null;
        element.matches('.search-options .city-search-result') ? this.weatherRequest.selectCity(element.dataset.lat, element.dataset.lon) : null;
      });

      document.addEventListener('keydown', event => {
        document.querySelector('#modal') && event.key === 'Escape' ? this.searchFormModal.removeSearchFormModal('main'): null;
      });

      document.addEventListener('keyup', event => {
        const element = event.target;
        element.matches('.search-form .search-input') ? this.searchFormModal.handleChange(element.value) : null;
      });

      document.addEventListener('submit', event => {
        const element = event.target;
        element.matches('.search-form') ? event.preventDefault() : null;
      });
    }

  // DOM methods
  renderApp() {
    this.header.renderPageLoadHeader('#app');
    this.renderMain('#app');
    this.footer.renderFooter('#app');
    this.pageLoadContent.renderPageLoadContent('main');
    this.events();
  }

  renderMain(location) {
    const main = document.createElement('main');
    document.querySelector(location).appendChild(main);
  }
}

export default App;