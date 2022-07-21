import Component from '../../core/component';
import CategoriesItem from '../categoties-item';
import { emit } from '../../utils/domHelpers';

function template() {
  return `
<div class="categories__carts wrapper__box"> 
</div>
`;
}

export default class CategoriesView extends Component {
  onCartsClick = (event) => {
    const target = event.target.closest('[data-category]');
    if (!target) return;

    let customEvent;
    if (event.target.closest('[data-toscore]')) {
      customEvent = 'show-score';
    } else {
      customEvent = 'category-selected';
    }

    emit({
      event: customEvent,
      elem: this.element,
      payload: target.dataset.category,
    });
  };

  constructor({
    carts = [],
    type = '',
  } = {}) {
    super();
    this.carts = carts;
    this.type = type;
  }

  render() {
    super.render(template());

    this.element.append(...this.getCategories());

    this.initEventListeners();

    return this.element;
  }

  getCategories() {
    return this.carts.map((cart) => (new CategoriesItem({ cart, type: this.type })).render());
  }

  initEventListeners() {
    this.element.addEventListener('click', this.onCartsClick);
  }
}
