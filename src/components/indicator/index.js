import fade from '../../utils/fade';
import Component from '../../core/component';

function template() {
  return `
<div class="art-quiz__indicator indicator"></div>
`;
}

export default class Indicator extends Component {
  answers;

  constructor({
    allAnswers = [],
  } = {}) {
    super();
    this.allAnswers = allAnswers;
  }

  render() {
    super.render(template());

    this.element.append(...this.getItems());

    return this.element;
  }

  getItems() {
    return this.allAnswers.map((item) => {
      const element = document.createElement('div');

      let extraClass = '';

      if (item === false) extraClass = 'indicator__item_fl';
      if (item === true) extraClass = 'indicator__item_tr';

      element.innerHTML = `<div class="indicator__item ${extraClass}"></div>`;

      return element.firstElementChild;
    });
  }

  updata(allAnswers) {
    this.allAnswers = allAnswers;
    fade(this.element, this.getItems());
  }
}
