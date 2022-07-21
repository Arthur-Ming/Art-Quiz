import Component from '../../core/component';
import titles from '../../pages/categories/titles';

function template(params) {
  return `
  <div class="categories__cart category _sound-click" data-category='${
  params.id
}'>
  <div class="category__header">
     <h4 class="category__title">${params.title}</h4>
     <p class="category__score score ${
  params.isPlayed ? 'category__score_sh' : ''
} ">
        <span class="score__current">${params.score}</span>/
        <span class="score__total">10</span>
     </p>
  </div>
  <div class="category__cart ${params.isPlayed ? 'category__cart_pl' : ''}">
     <img src="assets/img/categories/categories__cart/${params.type}/${
  params.id
}.jpg" alt="${params.title}">
  </div>
  <div class="category__again ${
  params.isPlayed ? 'category__again_sh' : ''
}" data-toscore='toscore'>
     <div class="category__again-text">Score</div>
  </div>
</div>
`;
}

export default class CategoriesItem extends Component {
  constructor({ cart: { answers = [], id = '' } = {}, type = '' } = {}) {
    super();
    this.params = {
      type,
      answers,
      id,
      isPlayed: answers.some((answer) => answer !== null),
      score: answers.filter((answer) => answer).length,
      title: titles[id],
    };
  }

  render() {
    super.render(template(this.params));
    return this.element;
  }
}
