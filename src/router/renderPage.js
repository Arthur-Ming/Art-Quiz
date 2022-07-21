export default function renderPage({
  from,
  to,
  duration = 300,
} = {}) {
  const content = document.getElementById('content');
  content.classList.add('main_fd');
  document.body.classList.add('_lock');

  setTimeout(() => {
    content.innerHTML = '';

    if (from && from.destroy) { from.destroy(); }

    content.append(to);
    document.body.classList.remove('_lock');
    content.classList.remove('main_fd');
  }, duration);
}
