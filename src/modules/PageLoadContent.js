class PageLoadContent {
  // DOM methods
  renderPageLoadContent(location) {
    const pageLoadContent = document.createElement('div');
    pageLoadContent.classList.add('button-group', 'page-load-buttons');
    pageLoadContent.innerHTML = `
      <button type="button" class="button current-location-button"><span class="fa-solid fa-location-dot icon" aria-hidden="true"></span> Get Current Location</button>
      <button type="button" class="button city-search-button"><span class="fa-solid fa-magnifying-glass" aria-hidden="true"></span> Search By City</button>
    `;
    document.querySelector(location).appendChild(pageLoadContent);
  }

  removePageLoadContent(location) {
    const pageLoadContent = document.querySelector(`${location} .page-load-buttons`);
    pageLoadContent ? document.querySelector(location).removeChild(pageLoadContent) : null;
  }
}

export default PageLoadContent;