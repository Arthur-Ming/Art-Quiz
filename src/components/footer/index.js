import Component from '../../core/component';

function template() {
  return `
<div class="footer__content wrapper__box">
  <a class="rss-logo" href="https://rs.school/js/">
    <img src="assets/img/rs_school_js _w.svg" alt="rss-logo">
  </a>
  <span>2021</span>
  <a href="https://github.com/Arthur-Ming" class="author">Arthur-Ming</a>
</div>
`;
}

export default class Footer extends Component {
  render() {
    super.render(template());
    return this.element;
  }
}
