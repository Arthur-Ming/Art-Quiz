import Router from '../../router';
import Storage from '../../storage';
import PageComponent from '../../core/page-component';

function template() {
  return `
<div class="main__content wrapper__box">
<div class="main__logo"></div>
<div class="main__buttons start-buttons" data-element="buttons">
  <button  class="start-buttons__button start-buttons__artist button _sound-click"  
      data-gametype="artistQuiz">
    <span>Artist quiz</span>
  </button>
  <button class="start-buttons__button start-buttons__picture button _sound-click" 
      data-gametype="pictureQuiz">
    <span>Pictures quiz</span>
  </button>
</div>
</div>
`;
}

const router = Router.instance();
const storage = Storage.instance();

export default class Main extends PageComponent {
  onButtonClick = (event) => {
    const target = event.target.closest('[data-gametype]');

    if (!target) return;

    storage.currentGameType = target.dataset.gametype;

    router.route({
      from: this,
      to: 'categories',
    });
  };

  render() {
    super.render(template());

    this.initEventListeners();

    return this.element;
  }

  initEventListeners() {
    this.subElements.buttons.addEventListener('click', this.onButtonClick);
  }
}
