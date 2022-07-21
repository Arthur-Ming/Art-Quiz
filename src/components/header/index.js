import PageComponent from '../../core/page-component';
import Settings from '../settings';
import Logo from '../logo';
import Nav from '../nav';
import SettingButton from '../settings-button';

function template() {
  return `
<div class="header__content wrapper__box">
  <div class="header__left" >
     <div class="logo header__logo _hidden" data-element="logo"></div>
  </div>
  <div class="header__right">
    <nav class="nav header__nav _hidden" data-element="nav"></nav>
    <div class="setting-button" data-element="button"></div>
    <div class="settings" data-element="settings"></div>
  </div>
</div>
`;
}

function setBg() {
  const src = 'assets/img/body-bg.png';

  const img = document.createElement('img');
  img.src = src;

  img.onload = () => {
    document.body.style.background = 'url("assets/img/body-bg.png") 50% 0 / cover no-repeat';
  };
}

setBg();

export default class Header extends PageComponent {
  element;

  subElements;

  onButtonToggle = () => {
    this.subElements.settings.classList.toggle('settings_open');
  };

  onRoute = (event) => {
    this.views[event.detail.to]();
    this.components.nav.highlightElem(event.detail.to);
  };

  initComponents() {
    const logo = new Logo();
    const nav = new Nav();
    const button = new SettingButton();
    const settings = new Settings();

    this.components = {
      logo,
      nav,
      button,
      settings,
    };

    this.renderComponents();
    this.initEventListeners();
  }

  render() {
    super.render(template());

    this.initComponents();

    return this.element;
  }

  initEventListeners() {
    const { element: button } = this.components.button;
    button.addEventListener('button-toggle', this.onButtonToggle);
    document.addEventListener('route', this.onRoute);
  }

  views = {
    categories: () => {
      this.showElems('logo', 'nav', 'settings');
      document.body.style.background = '#010101';
    },
    'art-quiz': () => {
      this.showElems('nav');
    },
    main: () => {
      this.showElems('button', 'settings');
      setBg();
    },
    results: () => {
      this.showElems('logo', 'nav', 'settings');
    },
  };

  showElems(...elems) {
    this.hideAllElems();
    for (const elem of elems) {
      this.subElements[elem].classList.remove('_hidden');
    }
  }

  hideAllElems() {
    for (const elem of Object.values(this.subElements)) {
      elem.classList.add('_hidden');
    }
  }
}
