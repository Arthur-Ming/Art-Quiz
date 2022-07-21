import { createElement } from '../../utils/domHelpers';

function template(params) {
  return `
<div class="results__picture picture _sound-click" data-item='item'>
   <div class="picture__icon">
      <img class="picture__img ${params.answer ? 'picture__img_color' : ''}" 
       src="assets/img/img/${params.imageNum}.jpg" alt="${params.name}">
   </div>
   <div class="picture__info">
      <h4 class="picture__name">${params.name}</h4>
      <div class="picture__capture">
         <div class="picture__auther">${params.author},</div>
         <div class="picture__year">${params.year}</div>
      </div>
   </div>
</div>
`;
}

export default class ResultsItem {
  element;

  result;

  constructor({
    result = {},
  } = {}) {
    this.result = result;
  }

  render() {
    this.element = createElement(template(this.result));
    return this.element;
  }
}
