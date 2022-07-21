import Component from '../component';
import { getSubElements } from '../../utils/domHelpers';

export default class PageComponent extends Component {
  subElements = null;

  components = {};

  render(temlate) {
    super.render(temlate);
    this.subElements = getSubElements(this.element);
  }

  renderComponents() {
    for (const [name, component] of Object.entries(this.components)) {
      this.subElements[name].append(component.render());
    }
  }
}
