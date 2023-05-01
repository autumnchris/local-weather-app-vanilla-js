class Header {
  // DOM methods
  renderHeader(location) {
    const header = document.createElement('header');
    header.innerHTML = `<h1>View your local weather</h1>`;
    document.querySelector(location).appendChild(header);
  }
}

export default Header;