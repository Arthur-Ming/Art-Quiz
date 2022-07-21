import { createElement, getSubElements } from '../../utils/domHelpers';

function template(value) {
  return `
<div class="volume__control">
 <input type="range" value="${value}" min="0" max="100" step="1" 
 class="progress audio--progress-loud _sound-click" data-element='progress'>
 <button class="volume__icon _sound-click" data-element='icon'>
    <svg width="21" height="22" viewBox="0 0 21 22" class="volume__icon_v">
       <use xlink:href='assets/svg/sprite.svg#volume' />
    </svg>
    <svg width="30" height="22" viewBox="0 0 30 22" class="volume__icon_m">
       <use xlink:href='assets/svg/sprite.svg#mute' />
    </svg>
 </button>
</div>
     `;
}

export default class VolumeControl {
  onProgress = (event) => {
    const { value } = event.target;
    this.value = Number(value);
    this.setProgress();
    this.setIcon();
  };

  onIconClick = () => {
    if (this.value === 0) {
      this.value = 20;
    } else {
      this.value = 0;
    }
    this.setProgress();
    this.setIcon();
    this.subElements.progress.value = this.value;
  };

  constructor(value = 20) {
    this.value = value;
  }

  setIcon() {
    if (this.value === 0) {
      this.subElements.icon.classList.add('volume__icon_mute');
    } else {
      this.subElements.icon.classList.remove('volume__icon_mute');
    }
  }

  setProgress() {
    this.subElements.progress.style.background = `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${this.value}%, #C4C4C4 ${this.value}%, #C4C4C4 100%)`;
  }

  render() {
    this.element = createElement(template(this.value));

    this.subElements = getSubElements(this.element);

    this.setProgress(this.value);
    this.setIcon();
    this.initEventListeners();

    return this.element;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
    this.setIcon();
    this.setProgress();
    this.subElements.progress.value = value;
  }

  initEventListeners() {
    this.subElements.progress.addEventListener('input', this.onProgress);
    this.subElements.icon.addEventListener('click', this.onIconClick);
  }
}
