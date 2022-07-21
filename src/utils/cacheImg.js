export default function cacheImg(paths) {
  const promise = paths.map((path) => {
    const img = document.createElement('img');
    img.src = path;

    return new Promise((resolve, reject) => {
      img.onload = () => resolve();
    });
  });

  return Promise.all(promise);
}
