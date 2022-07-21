import PageComponent from '../../core/page-component';
import Question from '../../components/question';
import AnswerVariants from '../../components/answer-variants';
import Indicator from '../../components/indicator';
import Storage from '../../storage';
import GamePopup from '../../components/game-popup';
import Timer from '../../components/timer';
import Sound from '../../components/sound';
import Router from '../../router';
import Notification from '../../components/notification';
import getRandomInt from '../../utils/getRandomInt';
import cacheImg from '../../utils/cacheImg';
import shuffle from '../../utils/shuffle';

function template(gameType) {
  return `
<div class="art-quiz${gameType === 'pictureQuiz' ? ' art-quiz_type-picture-quiz' : ''}">
  <div class="art-quiz__content wrapper__box">
    <div class="art-quiz__question question" data-element='question'></div>
    <div class="art-quiz__answer answer-options" data-element='answerVariants'></div>
  </div>
  <div class="popup " data-element='popup'></div>
</div>
`;
}

const ANSWERS_NUM = 4;
const MAX_QUESTIONS = 10;

const storage = Storage.instance();
const router = Router.instance();

const trueAnswerTypes = {
  artistQuiz: (answer) => answer.author,
  pictureQuiz: (answer) => answer.imageNum,
};

const categoriesPictureStarts = {
  artistQuiz: [0, 120],
  pictureQuiz: [120, 240],
};

export default class ArtQuiz extends PageComponent {
  gameType;

  category;

  round;

  score;

  currentQuestion = 0;

  currentAnswers = Array(MAX_QUESTIONS).fill(null);

  trueAnswer;

  data;

  timerParams;

  timer = null;

  onAnswerClick = (event) => {
    const isTrueAnswered = event.detail === trueAnswerTypes[this.gameType](this.trueAnswer);

    this.currentAnswers[this.currentQuestion] = isTrueAnswered;
    this.components.answerVariants.setIsTrue(isTrueAnswered);
    this.indicator.updata(this.currentAnswers);

    this.components.popup.show({
      ...this.round[this.currentQuestion],
      isTrueAnswered,
    });

    if (this.timer) this.timer.pause();

    if (isTrueAnswered) Sound.instance().ok();
    else Sound.instance().error();
  };

  onGoNext = async () => {
    this.currentQuestion += 1;

    if (this.currentQuestion < MAX_QUESTIONS) {
      this.components.popup.hide();
      this.trueAnswer = this.getTrueAnswer();
      this.currentAnswerVariants = this.getAnswerVariants();

      document.body.classList.add('_spinner');

      await this.cacheImg();

      this.components.question.updata(this.round[this.currentQuestion]);
      this.components.answerVariants.updata(this.currentAnswerVariants);
      if (this.timer) this.timer.reset().start();

      document.body.classList.remove('_spinner');
    }

    if (this.currentQuestion === MAX_QUESTIONS) {
      this.currentQuestion -= 1;

      storage[this.gameType][this.category].answers = this.currentAnswers;

      this.components.popup.hide();
      if (this.timer) this.timer.stop();

      setTimeout(() => {
        this.components.popup.show({
          currentScore: this.getScore(),
          totalScore: MAX_QUESTIONS,
        });

        Sound.instance().tada();

        const notification = new Notification({
          message: 'Results saved!',
        });
        notification.show();
      }, 300);
    }
  };

  onTimerOver = () => {
    const { element: answerVariants } = this.components.answerVariants;
    answerVariants.dispatchEvent(new CustomEvent('answer-click', { detail: null }));
    this.timer.stop();
  };

  onGoTo = (event) => {
    router.route({
      to: event.detail,
    });
  };

  onRoute = (e) => {
    if (e.detail.to === 'art-quiz') { return; }
    if (this.timer) this.timer.stop();
  };

  async initComponents() {
    await this.cacheImg();

    const question = new Question({
      gameType: this.gameType,
      currentQuestion: this.round[this.currentQuestion],
    });

    const answerVariants = new AnswerVariants({
      gameType: this.gameType,
      answerVariants: this.currentAnswerVariants,
    });

    this.indicator = new Indicator({
      allAnswers: this.currentAnswers,
    });

    if (this.timerParams.isActive) {
      this.timer = new Timer({
        duration: this.timerParams.time,
      });
      this.element.append(this.timer.render());
    }

    const popup = new GamePopup();

    if (this.gameType === 'artistQuiz') this.subElements.question.append(this.indicator.render());
    if (this.gameType === 'pictureQuiz') this.subElements.answerVariants.append(this.indicator.render());

    this.components = {
      question,
      answerVariants,
      popup,
    };

    super.renderComponents();

    if (this.timer) this.timer.start();
  }

  constructor() {
    super();
    this.category = storage.currentCategory;
    this.gameType = storage.currentGameType;
    this.timerParams = storage.settings.timer;
  }

  async getData() {
    const [start, end] = categoriesPictureStarts[this.gameType];
    const res = await fetch('data/data.json');
    const data = await res.json();
    return data.slice(start, end);
  }

  async render() {
    this.data = await this.getData();
    this.round = this.getRound();
    this.trueAnswer = this.getTrueAnswer();
    this.currentAnswerVariants = this.getAnswerVariants();

    super.render(template(this.gameType));

    await this.initComponents();

    this.initEventListeners();

    return this.element;
  }

  async cacheImg() {
    let srcs;
    if (this.gameType === 'artistQuiz') {
      srcs = [this.round[this.currentQuestion]].map(({ imageNum }) => `assets/img/img/${imageNum}.jpg`);
    }
    if (this.gameType === 'pictureQuiz') {
      srcs = this.currentAnswerVariants.map(({ imageNum }) => `assets/img/img/${imageNum}.jpg`);
    }
    await cacheImg(srcs);
  }

  getRound() {
    const start = this.category === 0 ? 0 : Number(`${this.category}0`);
    const end = start + MAX_QUESTIONS;
    return this.data.slice(start, end);
  }

  getAnswerVariants() {
    const answerVariants = [];

    answerVariants.push(this.trueAnswer);

    let i = 0;
    while (true) {
      if (i === ANSWERS_NUM - 1) break;
      const randomNum = getRandomInt(0, this.data.length);
      const { author: randomAuthor } = this.data[randomNum];

      if (!answerVariants.some(({ author }) => author === randomAuthor)) {
        answerVariants.push(this.data[randomNum]);
        i += 1;
      }
    }

    shuffle(answerVariants);

    return answerVariants;
  }

  getTrueAnswer() {
    return this.round[this.currentQuestion];
  }

  getScore() {
    return this.currentAnswers.reduce(
      (score, item) => score += item === true ? 1 : 0,
      0,
    );
  }

  initEventListeners() {
    const { element: answerVariants } = this.components.answerVariants;
    const { element: popup } = this.components.popup;

    answerVariants.addEventListener('answer-click', this.onAnswerClick);
    popup.addEventListener('go-next', this.onGoNext);
    popup.addEventListener('go-to', this.onGoTo);

    document.addEventListener('route', this.onRoute);

    if (this.timer) {
      this.timer.element.addEventListener('timer-over', this.onTimerOver);
    }
  }

  removeEventListeners() {
    document.removeEventListener('route', this.onRoute);
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}
