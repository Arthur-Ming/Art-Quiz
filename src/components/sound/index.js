export default class Sound {
  static instance() {
    if (!this._instance) {
      this._instance = new Sound();
    }
    return this._instance;
  }

  audio = new Audio();

  constructor() {
    this.initEventListeners();
  }

  click() {
    this.audio.src = 'assets/sounds/click.mp3';
    this.audio.play();
  }

  ok() {
    this.audio.src = 'assets/sounds/ok.mp3';
    this.audio.play();
  }

  error() {
    this.audio.src = 'assets/sounds/error.mp3';
    this.audio.play();
  }

  tada() {
    this.audio.src = 'assets/sounds/tada.mp3';
    this.audio.play();
  }

  setVolume(value) {
    this.audio.volume = value;
  }

  initEventListeners() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('._sound-click');
      if (!target) return;

      this.click();
    });
  }
}
