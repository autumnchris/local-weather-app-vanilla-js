class SwitchButton {
  // DOM methods
  renderSwitchButton(tempType, location) {
    const switchButton = document.createElement('button');
    switchButton.setAttribute('type', 'button');
    switchButton.classList.add('button', 'switch-button', tempType);
    switchButton.innerHTML = `&deg;${tempType.toUpperCase()}`;
    document.querySelector(location).appendChild(switchButton);
  }
}

export default SwitchButton;