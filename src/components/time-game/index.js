import { createElement, getSubElements } from '../../utils/domHelpers';

function template() {
  return `
<label class="time-game-toggler _sound-click">
  <input type="checkbox" class="time-game-toggler__input" name="toggler" 
         checked data-element='toggler'>
  <span class="time-game-toggler__state">
    <span class="time-game-toggler__control">
       <span class="time-game-toggler__round"></span>
    </span>
  </span>
</label>
`;
}

export default class TimeGame {
  onToggle = (event) => {
    this.value = event.target.checked;
  };

  constructor(value = false) {
    this.value = value;
  }

  render() {
    this.element = createElement(template());

    this.subElements = getSubElements(this.element);

    this.subElements.toggler.checked = this.value;

    this.initEventListeners();

    return this.element;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
    this.subElements.toggler.checked = value;
  }

  initEventListeners() {
    this.subElements.toggler.addEventListener('change', this.onToggle);
  }
}
