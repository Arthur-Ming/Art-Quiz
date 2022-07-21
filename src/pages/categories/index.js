import PageComponent from '../../core/page-component';
import Router from '../../router';
import CategoriesView from '../../components/categories-view';
import Storage from '../../storage';
import cacheImg from '../../utils/cacheImg';

const titles = {
  artistQuiz: 'Artist quiz',
  pictureQuiz: 'Picture quiz',
};

function template(gameType) {
  return `
<div class="categories">
  <h4 class="categories__title wrapper__box">${titles[gameType]}</h4>
  <div class="categories__view" data-element='categories'></div>
</div>
`;
}

const router = Router.instance();
const storage = Storage.instance();

export default class Categories extends PageComponent {
  onCategorySelected = (event) => {
    const { detail: category } = event;

    storage.currentCategory = category;
    router.route({
      to: 'art-quiz',
    });
  };

  onShowScore = (event) => {
    const { detail: category } = event;
    storage.currentCategory = category;
    router.route({
      from: this,
      to: 'results',
    });
  };

  onNavClick = (e) => {
    router.route({
      from: this,
      to: e.detail,
    });
  };

  async initComponents() {
    await this.cacheImg(this.categories);

    const categories = new CategoriesView({
      carts: this.categories,
      type: this.type,
    });

    this.components = {
      categories,
    };

    super.renderComponents();
    this.initEventListeners();
  }

  constructor() {
    super();
    this.type = storage.currentGameType;
    this.categories = storage[this.type];
  }

  async render() {
    super.render(template(this.type));

    await this.initComponents();

    return this.element;
  }

  async cacheImg(arr) {
    const srcs = arr.map(({ id }) => `assets/img/categories/categories__cart/${this.type}/${id}.jpg`);
    await cacheImg(srcs);
  }

  initEventListeners() {
    const { element: categories } = this.components.categories;
    categories.addEventListener('category-selected', this.onCategorySelected);
    categories.addEventListener('show-score', this.onShowScore);
  }
}
