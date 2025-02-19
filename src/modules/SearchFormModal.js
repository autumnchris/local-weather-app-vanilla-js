import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import CitySearchResults from './CitySearchResults';
import ErrorMessage from "./ErrorMessage";

class SearchFormModal {
  constructor() {
    this.loadingSpinner = new LoadingSpinner();
    this.citySearchResults = new CitySearchResults();
    this.errorMessage = new ErrorMessage();
    this.searchInput = '';
    this.timer;
  }

  handleChange(searchInput) {
    this.errorMessage.removeErrorMessage('.modal-body');
    this.citySearchResults.removeCitySearchResults('.modal-body');

    if (searchInput.trim()) {

      if (!document.querySelector('#modal .modal-body .loading-spinner')) {
        this.loadingSpinner.renderLoadingSpinner('.modal-body');
      }
      this.searchInput = searchInput.trim();
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.fetchCitySearchResults(this.searchInput);
      }, 1300);
    }
    else {
      this.citySearchResults.removeCitySearchResults('.modal-body');
      this.errorMessage.removeErrorMessage('.modal-body');
    }
  }

  fetchCitySearchResults(searchInput) {
    axios.get(`https://autumnchris-local-weather-backend.onrender.com/cities?searchInput=${searchInput}`).then(response => {
      this.loadingSpinner.removeLoadingSpinner('.modal-body');

      if (response.data.cities.data.length === 0 && searchInput) {
        this.errorMessage.renderErrorMessage('No cities match your search.', '.modal-body');
      }
      else {
        this.citySearchResults.renderCitySearchResults(response.data.cities.data, '.modal-body');
      }
    }).catch(() => {
      this.loadingSpinner.removeLoadingSpinner('.modal-body');
      this.errorMessage.renderErrorMessage('Unable to load city search results at this time.', '.modal-body');
    });
  }

  // Event listeners
  events() {
    document.addEventListener('keyup', event => {
      const element = event.target;
      element.matches('.search-form .search-input') ? this.handleChange(element.value) : null;
    });

    document.addEventListener('submit', event => {
      const element = event.target;
      element.matches('.search-form') ? event.preventDefault() : null;
    });
  }

  // DOM methods
  renderSearchFormModal(location) {
    const searchFormModal = document.createElement('div');
    searchFormModal.setAttribute('id', 'modal');
    searchFormModal.classList.add('modal');
    searchFormModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <div class="button-group">
            <button type="button" class="button close-button" aria-label="Close Search Form" title="Close Search Form">
              <span class="fa-solid fa-xmark fa-lg icon"></span>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <form role="search" class="search-form" novalidate>
            <div class="form-group">
              <span class="fa-solid fa-magnifying-glass fa-sm search-icon" aria-hidden="true"></span>
              <input type="text" name="citySearch" class="search-input" aria-label="Search by city..." placeholder="Search by city..." id="city-search" autocomplete="off" required />
            </div>
          </form>
        </div>
      </div>
    `;
    document.querySelector(location).appendChild(searchFormModal);
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.search-form .search-input').focus();
    this.events();
  }

  removeSearchFormModal(location) {
    const searchFormModal = document.querySelector(`${location} #modal`);
    searchFormModal ? document.querySelector(location).removeChild(searchFormModal) : null;
    document.querySelector('body').classList.remove('modal-open');
  }
}

export default SearchFormModal;