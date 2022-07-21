import defaultSettings from '../data/defaultSettings';

const QUESTIONS_NUM = 10;
const CATEGORIES_NUM = 12;

const defaultData = {
  artistQuiz: Array.from(Array(CATEGORIES_NUM), (_, index) => ({
    id: index,
    answers: Array(QUESTIONS_NUM).fill(null),
  })),
  pictureQuiz: Array.from(Array(CATEGORIES_NUM), (_, index) => ({
    id: index,
    answers: Array(QUESTIONS_NUM).fill(true),
  })),
};

export default class Storage {
  _artistQuiz;

  _pictureQuiz;

  _currentGameType;

  _settings;

  _currentCategory;

  static instance() {
    if (!this._instance) {
      this._instance = new Storage();
    }
    return this._instance;
  }

  setLocalStorage = () => {
    localStorage.setItem('artQuizStorage', JSON.stringify({
      settings: this.settings,
      artistQuiz: this.artistQuiz,
      pictureQuiz: this.pictureQuiz,
    }));
  };

  constructor() {
    this.initEventListeners();
  }

  get currentGameType() {
    return this._currentGameType;
  }

  get artistQuiz() {
    return this._artistQuiz;
  }

  get pictureQuiz() {
    return this._pictureQuiz;
  }

  get settings() {
    return this._settings;
  }

  get currentCategory() {
    return this._currentCategory;
  }

  set currentGameType(value) {
    this._currentGameType = value;
  }

  set artistQuiz(newValue) {
    this._artistQuiz = newValue;
  }

  set pictureQuiz(newValue) {
    this._pictureQuiz = newValue;
  }

  set settings(newValue) {
    this._settings = newValue;
  }

  set currentCategory(newValue) {
    this._currentCategory = newValue;
  }

  async getLocalStorage() {
    if (localStorage.getItem('artQuizStorage')) {
      const artQuizStorage = await JSON.parse(localStorage.getItem('artQuizStorage'));
      this.settings = artQuizStorage.settings;
      this.artistQuiz = artQuizStorage.artistQuiz;
      this.pictureQuiz = artQuizStorage.pictureQuiz;
    } else {
      this.settings = defaultSettings;
      this.artistQuiz = defaultData.artistQuiz;
      this.pictureQuiz = defaultData.pictureQuiz;
    }
  }

  initEventListeners() {
    window.addEventListener('beforeunload', this.setLocalStorage);
  }
}
