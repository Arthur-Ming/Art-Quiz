import Component from '../../core/component';
import ResultsItem from '../results-item';

function template() {
  return `
<div class="results__pictures wrapper__box">
</div>
`;
}

export default class ResultsView extends Component {
  results;

  onPointerDown = (event) => {
    const target = event.target.closest('[data-item]');

    if (!target) return;
    target.classList.toggle('picture__info_sh');
  };

  constructor({
    results = [],
  } = {}) {
    super();
    this.results = results;
  }

  render() {
    super.render(template());

    this.element.append(...this.getItems());

    this.initEventListeners();

    return this.element;
  }

  getItems() {
    return this.results.map(({
      imageNum, author, year, name, answer,
    }) => (new ResultsItem({
      result: {
        imageNum, author, year, name, answer,
      },
    })).render());
  }

  initEventListeners() {
    this.element.addEventListener('pointerdown', this.onPointerDown);
  }
}
