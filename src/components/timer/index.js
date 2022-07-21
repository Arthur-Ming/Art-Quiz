import Component from '../../core/component';
import { createElement, getSubElements } from '../../utils/domHelpers';

function template() {
  return `
<div class="timer">
 <div class="timer__content">
    <div class="timer__time">
       <span data-element='time'>00:00</span>
    </div>
 </div>
</div>
`;
}

export default class Timer extends Component {
  subElements;

  duration;

  seconds = 0;

  format = 'mm:ss';

  constructor({

    duration = 10,

  } = {}) {
    super();
    this.duration = duration;
  }

  render() {
    super.render(template());

    this.subElements = getSubElements(this.element);

    return this.element;
  }

  formatTime(seconds) {
    let ss = seconds % 60;
    let mm = Math.floor(seconds / 60);

    mm = mm < 10 ? `0${mm}` : mm;
    ss = ss < 10 ? `0${ss}` : ss;

    return this.format.replace('mm', mm).replace('ss', ss);
  }

  start() {
    this.slider();
    this.timerId = setInterval(() => {
      this.seconds += 1;
      this.subElements.time.textContent = this.formatTime(this.seconds);
      if (this.seconds === this.duration) {
        this.timerOver();
      }
    }, 1000);
    return this;
  }

  stop() {
    this.seconds = 0;
    clearInterval(this.timerId);
    clearInterval(this.slideTimerId);
    return this;
  }

  pause() {
    clearInterval(this.timerId);
    clearInterval(this.slideTimerId);
    return this;
  }

  reset() {
    this.seconds = 0;
    this.subElements.time.textContent = this.format.replace('mm', '00').replace('ss', '00');
    this.element.classList.remove('timer_over');
    return this;
  }

  timerOver() {
    setTimeout(() => {
      this.element.dispatchEvent(new CustomEvent('timer-over'));
      this.element.classList.add('timer_over');
    }, 0);
  }

  slider() {
    const start = Date.now();

    this.slideTimerId = setInterval(() => {
      const timePassed = Date.now() - start;

      const value = timePassed / (this.duration * 10);

      if (timePassed > this.duration * 1000) clearInterval(this.slideTimerId);

      this.element.style.background = `linear-gradient(to right, #ff7e7e  0%, #ff7e7e  ${value}%, #3dda69 ${value}%, #3dda69 100%)`;
    }, 10);
  }
}
