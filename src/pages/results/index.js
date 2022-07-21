import PageComponent from '../../core/page-component';
import ResultsView from '../../components/results-view';
import Storage from '../../storage';
import Router from '../../router';
import cacheImg from '../../utils/cacheImg';

function template() {
  return `
<div class="results">
  <h4 class="results__title wrapper__box">Score</h4>
  <div class="results__view" data-element='resultsView'></div>
</div>
`;
}

const MAX_QUESTIONS = 10;

const router = Router.instance();
const storage = Storage.instance();

const categoriesPictureStarts = {
  artistQuiz: [0, 120],
  pictureQuiz: [120, 240],
};

export default class Results extends PageComponent {
  data;

  onNavClick = (e) => {
    router.route({
      from: this,
      to: e.detail,
    });
  };

  async initComponents() {
    const results = this.getResultsData();

    const srcs = results.map(({ imageNum }) => `assets/img/img/${imageNum}.jpg`);

    await cacheImg(srcs);

    const resultsView = new ResultsView({ results });

    this.components = {
      resultsView,
    };

    this.renderComponents();
  }

  constructor() {
    super();
    this.type = storage.currentGameType;
    this.category = storage.currentCategory;
  }

  async render() {
    this.data = await this.getData();

    super.render(template());

    await this.initComponents();

    return this.element;
  }

  getResultsData() {
    const start = this.category === 0 ? 0 : Number(`${this.category}0`);
    const end = start + MAX_QUESTIONS;
    const { answers } = storage[this.type][this.category];

    return this.data.slice(start, end).map((item, index) => ({
      ...item,
      answer: answers[index],
    }));
  }

  async getData() {
    const [start, end] = categoriesPictureStarts[this.type];
    const res = await fetch('data/data.json');
    const data = await res.json();
    return data.slice(start, end);
  }
}
