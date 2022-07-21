export function getSubElements(element, name = '[data-element]') {
  if (!element) return;

  const elements = element.querySelectorAll(name);

  return [...elements].reduce((result, item) => {
    if (item.dataset.element) { result[item.dataset.element] = item; }

    return result;
  }, {});
}

export function createElement(template, tag = 'div') {
  const element = document.createElement(tag);

  element.innerHTML = template;

  if (element.firstElementChild) { return element.firstElementChild; }
  throw Error('Template is not correct');
}

export function emit({
  event,
  elem,
  payload = null,
} = {}) {
  if (elem) { elem.dispatchEvent(new CustomEvent(event, { detail: payload })); }
}
