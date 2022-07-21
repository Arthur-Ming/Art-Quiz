import Main from './pages/main';
import Header from './components/header';
import Footer from './components/footer';
import Storage from './storage';
import { createElement, getSubElements } from './utils/domHelpers';

function template() {
  return `
<div class="wrapper">
  <header class="header" data-element="header"></header>
  <main class="main" id='content' data-element="main"></main>
  <footer class="footer" data-element="footer"></footer>
</div>
`;
}

export default class App {
  element;

  subElements;

  components;

  async initComponents() {
    await Storage.instance().getLocalStorage();

    const header = new Header();
    const main = new Main();
    const footer = new Footer();

    this.components = {
      header,
      main,
      footer,
    };

    this.renderComponents();
  }

  render() {
    this.element = createElement(template());

    this.subElements = getSubElements(this.element);

    this.initComponents();

    return this.element;
  }

  renderComponents() {
    Object.entries(this.components)
      .forEach(([name, component]) => this.subElements[name].append(component.render()));
    /* for (const [name, component] of Object.entries(this.components)) {
      this.subElements[name].append(component.render());
    } */
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
