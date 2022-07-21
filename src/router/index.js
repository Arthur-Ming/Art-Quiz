import renderPage from './renderPage';

export default class Router {
  static instance() {
    if (!this._instance) {
      this._instance = new Router();
    }
    return this._instance;
  }

  page = null;

  async route({ to, params = {} } = {}) {
    document.body.classList.add('_spinner');

    const { default: Page } = await import(`../pages/${to}/index.js`);

    const newPage = new Page();
    const element = await newPage.render();

    document.body.classList.remove('_spinner');

    renderPage({
      from: this.page,
      to: element,
    });

    this.page = newPage;

    document.dispatchEvent(new CustomEvent('route', {
      detail: {
        to,
      },
    }));
  }
}
