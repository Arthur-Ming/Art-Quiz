import './scss/app.scss';
import App from './App';

localStorage.clear();
const app = new App();

document.getElementById('app').append(app.render());
