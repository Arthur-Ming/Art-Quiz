export default class Component {
  element = null;

  render(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    this.element = element.firstElementChild;
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
