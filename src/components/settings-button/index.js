import { createElement, emit } from '../../utils/domHelpers';

function template() {
  return `
<button class="header__setting setting-button__button _sound-click">
  <svg class="setting-button__icon setting-button__icon_open" viewBox="0 0 34 34">
    <use xlink:href='assets/svg/sprite.svg#settings' />
  </svg>
  <svg class="setting-button__icon setting-button__icon_close" viewBox="0 0 18 18">
    <use xlink:href='assets/svg/sprite.svg#close' />
  </svg>
</button>
`;
}

export default class SettingButton {
  element;

  onButtonClick = () => {
    this.element.classList.toggle('setting-button__button_open');

    emit({
      event: 'button-toggle',
      elem: this.element,
    });
  };

  render() {
    this.element = createElement(template());
    this.initEventListeners();
    return this.element;
  }

  initEventListeners() {
    this.element.addEventListener('click', this.onButtonClick);
  }
}
