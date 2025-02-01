class CitySearchResults {
  // DOM methods
  renderCitySearchResults(citySearchResultsData, location) {
    const citySearchResults = document.createElement('div');
    citySearchResults.classList.add('search-options');
    citySearchResults.innerHTML = citySearchResultsData.sort((a, b) => b.population - a.population).map(city => {
      return `
        <button class="button city-search-result" data-lat="${city.latitude}" data-lon="${city.longitude}">
          <p class="city result-text">${city.city}, ${city.region}</p>
          <p class="country result-text">${city.country}</p>
        </button>
      `;
    }).join('');
    document.querySelector(location).appendChild(citySearchResults);
  }

  removeCitySearchResults(location) {
    const citySearchResults = document.querySelector(`${location} .search-options`);
    citySearchResults ? document.querySelector(location).removeChild(citySearchResults) : null;
  }
}

export default CitySearchResults;