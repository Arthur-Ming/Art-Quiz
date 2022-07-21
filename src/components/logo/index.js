import { createElement } from '../../utils/domHelpers';

function template() {
  return `
<div class="logo__icon"></div>
`;
}

export default class Logo {
  element;

  render() {
    this.element = createElement(template());
    return this.element;
  }
}
