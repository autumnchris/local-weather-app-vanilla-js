class LoadingSpinner {
  // DOM methods
  renderLoadingSpinner(location) {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.setAttribute('aria-label', 'Loading...');
    loadingSpinner.classList.add('loading-spinner');
    document.querySelector(location).appendChild(loadingSpinner);
  }

  removeLoadingSpinner(location) {
    const loadingSpinner = document.querySelector(`${location} .loading-spinner`);
    loadingSpinner ? document.querySelector(location).removeChild(loadingSpinner) : null;
  }
}

export default LoadingSpinner;