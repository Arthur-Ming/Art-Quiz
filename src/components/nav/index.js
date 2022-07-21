import { getSubElements, createElement, emit } from '../../utils/domHelpers';
import Router from '../../router';

const router = Router.instance();

function template() {
  return `
<ul class="nav__list">
  <li class="nav__item _sound-click" data-element="main">Home</li>
  <li class="nav__item _sound-click" data-element="categories">Categories</li>
</ul>
`;
}

export default class Nav {
  element;

  subElements;

  onNavClick = (event) => {
    const target = event.target.closest('[data-element]');

    if (!target || event.target.closest('.nav__item_active')) return;

    router.route({
      to: target.dataset.element,
    });
  };

  render() {
    this.element = createElement(template());
    this.subElements = getSubElements(this.element);
    this.initEventListeners();
    return this.element;
  }

  initEventListeners() {
    this.element.addEventListener('click', this.onNavClick);
  }

  highlightElem(elemName) {
    for (const [name, elem] of Object.entries(this.subElements)) {
      elem.classList.remove('nav__item_active');
      if (name === elemName) {
        elem.classList.add('nav__item_active');
      }
    }
  }
}
