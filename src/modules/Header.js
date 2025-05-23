class Header {
  // DOM methods
  renderPageLoadHeader(location) {
    const pageLoadHeader = document.createElement('header');
    pageLoadHeader.classList.add('page-load-view');
    pageLoadHeader.innerHTML = `<h1>View the local weather</h1>`;
    document.querySelector(location).appendChild(pageLoadHeader);
  }

  removePageLoadHeader(location) {
    const pageLoadHeader = document.querySelector(`${location} .page-load-view`);
    pageLoadHeader ? document.querySelector(location).removeChild(pageLoadHeader) : null;
  }

  renderResultsHeader(location) {
    const resultsHeader = document.createElement('header');
    resultsHeader.classList.add('results-view');
    resultsHeader.innerHTML = `
      <div className="item">
        <h1>View the local weather</h1>
      </div>
      <div class="item">
        <aside>
          <div class="button-group">
            <button type="button" class="button city-search-button" aria-label="Search By City" title="Search By City">
              <span class="fa-solid fa-magnifying-glass icon"></span>
            </button>
            <button type="button" class="button current-location-button" aria-label="Get Current Location" title="Get Current Location">
              <span class="fa-solid fa-location-dot icon"></span>
            </button>
          </div>
        </aside>
      </div>
    `;

    if (typeof location === 'string') {
      document.querySelector(location).appendChild(resultsHeader);
    }
    else if (Array.isArray(location)) {
      document.querySelector(location[0]).insertBefore(resultsHeader, document.querySelector(location[1]));
    }
  }

  removeResultsHeader(location) {
    const resultsHeader = document.querySelector(`${location} .results-view`);
    resultsHeader ? document.querySelector(location).removeChild(resultsHeader) : null;
  }
}

export default Header;