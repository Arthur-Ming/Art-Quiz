import VolumeControl from '../volume-control';
import TimeGame from '../time-game';
import Quantity from '../quantity';
import Storage from '../../storage';
import Notification from '../notification';
import defaultSettings from '../../data/defaultSettings';
import Sound from '../sound';
import { createElement, getSubElements } from '../../utils/domHelpers';

function template() {
  return `

<div class="settings__content wrapper__box">
    <h4 class="settings__title">Settings</h4>
    <div class="settings__items">
      <div class="settings__item setting volume" data-element='volume'>
        <div class=" setting__title">Volume</div>
      </div>
      <div class="settings__item setting time-game" data-element='time'>
        <div class=" setting__title">Time game</div>
      </div>
      <div class="settings__item setting settings-quantity" data-element='quantity'>
        <div class="setting__title">Time to answer</div>
      </div>
    </div>
    <div class="settings__buttons" data-element='buttons'>
       <button class="settings__button button _sound-click" data-button='default'>
          <span>Default</span>
       </button>
       <button class="settings__button button _sound-click" data-button='save'>
          <span>Save</span>
       </button>
    </div>
</div>
`;
}

const storage = Storage.instance();

export default class Settings {
  element;

  subElements;

  components;

  onButtonClick = (event) => {
    const target = event.target.closest('[data-button]');
    if (!target) return;

    Sound.instance().click();

    this.buttonHandlers[target.dataset.button]();
  };

  buttonHandlers = {
    default: () => {
      const { volume: value, timer } = defaultSettings;
      this.components.volume.setValue(value);
      this.components.time.setValue(timer.isActive);
      this.components.quantity.setValue(timer.time);
      Sound.instance().setVolume(value / 100);
    },
    save: () => {
      storage.settings = {
        volume: this.components.volume.getValue(),
        timer: {
          isActive: this.components.time.getValue(),
          time: this.components.quantity.getValue(),
        },
      };
      Sound.instance().setVolume(this.components.volume.getValue() / 100);
      const notification = new Notification({
        message: 'Settings have been saved!',
      });
      notification.show();
    },
  };

  initComponents() {
    const { volume: value, timer } = storage.settings;

    const volume = new VolumeControl(value);
    const time = new TimeGame(timer.isActive);
    const quantity = new Quantity(timer.time);
    Sound.instance().setVolume(Storage.instance().settings.volume / 100);

    this.components = {
      volume,
      time,
      quantity,
    };

    this.renderComponents();
    this.initEventListeners();
  }

  render() {
    this.element = createElement(template());

    this.subElements = getSubElements(this.element);

    this.initComponents();

    return this.element;
  }

  renderComponents() {
    for (const [name, component] of Object.entries(this.components)) {
      this.subElements[name].append(component.render());
    }
  }

  toggle() {
    this.element.classList.toggle('settings_open');
  }

  initEventListeners() {
    this.subElements.buttons.addEventListener('click', this.onButtonClick);
  }
}
