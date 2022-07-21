import Component from '../../core/component';

function template(message) {
  return `
<div class="notification notification_success">
  <div class="notification__wrapper">
    <div class="notification__header">Success</div>
    <div class="notification__body">${message}</div>
  </div>
</div>
`;
}

export default class Notification extends Component {
  answers;

  static staticElement = null;

  constructor({
    type = 'success',
    message = '',
    duration = 2000,
  } = {}) {
    super();
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  render() {
    super.render(template(this.message));
    return this.element;
  }

  show(elem = document.body) {
    if (Notification.staticElement) {
      Notification.staticElement.remove();
    }

    Notification.staticElement = this.element;

    elem.append(this.element);

    setTimeout(() => {
      this.element.classList.add('notification_show');
    }, 0);
    setTimeout(() => {
      this.element.classList.remove('notification_show');
    }, 1000);

    setTimeout(() => {
      this.destroy();
    }, this.duration);
  }
}
