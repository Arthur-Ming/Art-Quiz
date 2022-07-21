import Component from '../../core/component';
import fade from '../../utils/fade';

function template() {
  return `
<div class="art-quiz__buttons">
</div>
`;
}

const templates = {
  artistQuiz: (answer) => {
    const { author } = answer;
    return `
<button class="art-quiz__button button" data-elem='${author}'>
    <span class="art-quiz__button_text">${author}</span>
</button>
`;
  },

  pictureQuiz: (answer) => {
    const { imageNum } = answer;
    return `
<button class="art-quiz__button button" data-elem='${imageNum}'>
    <span class="art-quiz__button_img">
        <img src="assets/img/img/${imageNum}.jpg" alt="">
    </span>
</button>
`;
  },

};

export default class Answers extends Component {
  gameType;

  answerVariants;

  selectedAnswer = null;

  constructor({
    gameType = '',
    answerVariants = [],
  } = {}) {
    super();
    this.gameType = gameType;
    this.answerVariants = answerVariants;
  }

  render() {
    super.render(template());

    this.element.append(...this.getAnswers());

    this.initEventListeners();

    return this.element;
  }

  getAnswers() {
    return this.answerVariants.map((answer) => {
      const element = document.createElement('div');

      element.innerHTML = templates[this.gameType](answer);

      return element.firstElementChild;
    });
  }

  updata(answerVariants) {
    this.answerVariants = answerVariants;

    fade(this.element, this.getAnswers());
  }

  setIsTrue(isTrue) {
    const extraClass = isTrue ? '_selected-answer_tr' : '_selected-answer_fl';

    if (this.selectedAnswer) { this.selectedAnswer.classList.add(extraClass); }
  }

  initEventListeners() {
    this.element.addEventListener('click', (event) => {
      this.selectedAnswer = event.target.closest('[data-elem]');
      if (!this.selectedAnswer) return;
      this.element.dispatchEvent(new CustomEvent('answer-click', {
        detail: this.selectedAnswer.dataset.elem,
      }));
    });
  }
}
