class SwitchButton {
  // DOM methods
  renderSwitchButton(tempType, location) {
    const switchButton = document.createElement('button');
    switchButton.setAttribute('type', 'button');
    switchButton.classList.add('button', 'switch-button', tempType);
    switchButton.innerHTML = `&deg;${tempType.toUpperCase()}`;

    if (typeof location === 'string') {
      document.querySelector(location).appendChild(switchButton);
    }
    else if (Array.isArray(location)) {
      document.querySelector(location[0]).insertBefore(switchButton, document.querySelector(location[1]));
    }
  }

  removeSwitchButton(location) {
    const switchButton = document.querySelector(`${location} .switch-button`);
    switchButton ? document.querySelector(location).removeChild(switchButton) : null;
  }
}

export default SwitchButton;