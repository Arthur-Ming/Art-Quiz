export default function fade(elemFrom, elemTo, duration = 300) {
  elemFrom.classList.add('main_fd');

  setTimeout(() => {
    elemFrom.innerHTML = '';
    elemFrom.append(...elemTo);
    elemFrom.classList.remove('main_fd');
  }, duration);
}
