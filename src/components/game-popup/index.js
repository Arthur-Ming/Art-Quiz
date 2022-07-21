import Component from '../../core/component';
import { getSubElements, emit } from '../../utils/domHelpers';

function template() {
  return `
<div class="game-popup _hidden">
 <div class="game-popup__content wrapper__box">
    <div class="game-popup__popup" data-element='content'>
    </div>
 </div>
</div>
`;
}

const templates = {
  answerResult: (params) => {
    const {
      imageNum, isTrueAnswered, name, author, year,
    } = params;
    return `
<div class="game-popup__picture">
  <div class="game-popup__img">
    <img src="assets/img/img/${imageNum}.jpg" alt="">
  </div>
  <div class="sign ${isTrueAnswered ? 'sign__tr' : ''} ">
       <svg class="sign_true" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use xlink:href='assets/svg/sprite.svg#sign-true' />
       </svg>
       <div class="sign_false">
          <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
             <use xlink:href='assets/svg/sprite.svg#sign-false' />
          </svg>
       </div>
    </div>
 </div>
 <div class="game-popup__name">${name}</div>
 <div class="game-popup__capture">
    <div class="game-popup__auther">${author},</div>
    <div class="game-popup__year">${year}</div>
 </div>
 <button class="game-popup__button button" data-elem='next'>
    <span>Next</span>
 </button>
`;
  },
  roundFinished: (params) => {
    const { currentScore, totalScore } = params;
    return `
<div class="round-finished__icon">
  <svg viewBox="0 0 167 156" xmlns="http://www.w3.org/2000/svg">
      <use xlink:href='assets/svg/sprite.svg#round-finished' />
  </svg>
</div>
<h4 class="round-finished__title">
  Congratulations!
</h4>
<div class="round-finished__score">
  <div class="round-finished__current-score">${currentScore}</div>
  <span>/</span>
  <div class="round-finished__total-score">${totalScore}</div>
</div>
<div class="round-finished__buttons" data-element='buttons'>
  <button class="round-finished__button button" data-elem='main'>
    <span>Home</span>
  </button>
  <button class="round-finished__button button" data-elem='categories'>
     <span>Next Quiz</span>
  </button>
</div>
      `;
  },
};

export default class GamePopup extends Component {
  subElements;

  popupType;

  onClick = (event) => {
    const target = event.target.closest('[data-elem]');

    if (!target) return;

    document.body.classList.add('_lock');

    if (target.dataset.elem === 'next') {
      emit({
        event: 'go-next',
        elem: this.element,
      });
    }

    if (target.dataset.elem === 'main' || target.dataset.elem === 'categories') {
      emit({
        event: 'go-to',
        elem: this.element,
        payload: target.dataset.elem,
      });
    }
    setTimeout(() => {
      document.body.classList.remove('_lock');
    }, 300);
  };

  render() {
    super.render(template());

    this.subElements = getSubElements(this.element);

    this.initEventListeners();

    return this.element;
  }

  show({
    author = '',
    name = '',
    year = '',
    imageNum = '',
    isTrueAnswered = false,
    currentScore = null,
    totalScore = null,
  } = {}) {
    let params;
    if (currentScore !== null && totalScore !== null) {
      this.popupType = 'roundFinished';
      params = {
        currentScore,
        totalScore,
      };
    } else {
      this.popupType = 'answerResult';
      params = {
        author,
        name,
        year,
        imageNum,
        isTrueAnswered,
      };
    }
    this.subElements.content.innerHTML = '';
    this.subElements.content.innerHTML = templates[this.popupType](params);

    this.element.classList.remove('_hidden');

    setTimeout(() => {
      this.element.classList.add('main_fd');
    }, 0);

    return this;
  }

  hide() {
    this.element.classList.remove('main_fd');

    setTimeout(() => {
      this.element.classList.add('_hidden');
    }, 300);
  }

  initEventListeners() {
    this.subElements.content.addEventListener('click', this.onClick);
  }
}
