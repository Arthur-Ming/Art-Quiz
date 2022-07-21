import { createElement, getSubElements } from '../../utils/domHelpers';

function template(value) {
  return `
<div class="quantity">
  <button class="quantity__button quantity__button_minus _sound-click" data-button='minus'></button>
  <div class="quantity__input">
    <input autocomplete="off" type="number" name="form[]" value="${value}" data-element='input'>
  </div>
  <button class="quantity__button quantity__button_plus _sound-click" data-button='plus'></button>
</div>
`;
}

const MAX = 30;
const MIN = 5;

export default class Quantity {
  element;

  subElements;

  onClick = (event) => {
    event.preventDefault();

    const target = event.target.closest('[data-button]');

    if (!target) return;

    this.buttonHandlers[target.dataset.button]();
  };

  buttonHandlers = {
    plus: () => {
      if (this.value < MAX) { this.value += 5; }
      this.subElements.input.value = this.value;
    },
    minus: () => {
      if (this.value > MIN) { this.value -= 5; }
      this.subElements.input.value = this.value;
    },
  };

  constructor(value = 5) {
    this.value = value;
  }

  render() {
    this.element = createElement(template(this.value));

    this.subElements = getSubElements(this.element);

    this.initEventListeners();

    return this.element;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
    this.subElements.input.value = value;
  }

  initEventListeners() {
    this.element.addEventListener('click', this.onClick);
  }
}
