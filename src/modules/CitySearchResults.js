class CitySearchResults {
  // DOM methods
  renderCitySearchResults(citySearchResultsData, location) {
    const citySearchResults = document.createElement('div');
    citySearchResults.classList.add('search-options');
    citySearchResults.innerHTML = citySearchResultsData.sort((a, b) => b.population - a.population).map(city => {
      return `
        <div class="city-search-result" data-lat="${city.latitude}" data-lon="${city.longitude}">
          <div class="city result-text">${city.city}, ${city.region}</div>
          <div class="country result-text">${city.country}</div>
        </div>
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