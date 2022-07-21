import Component from '../../core/component';
import fade from '../../utils/fade';

function template() {
  return `
<div class="question__content"></div>
`;
}

const templates = {
  artistQuiz: (currentQuestion) => {
    const { imageNum } = currentQuestion;

    return `
<div class="art-quiz__picture-question">
  <h4>Who is the author of this picture ?</h4>
  <div class="art-quiz__img">
    <img src="assets/img/img/${imageNum}.jpg" alt="">
  </div>
</div>`;
  },
  pictureQuiz: (currentQuestion) => {
    const { author } = currentQuestion;

    return `
<h4 class="art-quiz__text-question">
  Which is <span>${author}</span> picture?
</h4>
`;
  },
};

export default class Question extends Component {
  gameType;

  currentQuestion;

  constructor({
    gameType = '',
    currentQuestion = {},
  } = {}) {
    super();
    this.gameType = gameType;
    this.currentQuestion = currentQuestion;
  }

  render() {
    super.render(template());

    this.element.append(this.getContent());

    return this.element;
  }

  getContent() {
    const element = document.createElement('div');

    element.innerHTML = templates[this.gameType](this.currentQuestion);

    return element.firstElementChild;
  }

  updata(currentQuestion) {
    this.currentQuestion = currentQuestion;
    fade(this.element, [this.getContent()]);
  }
}
