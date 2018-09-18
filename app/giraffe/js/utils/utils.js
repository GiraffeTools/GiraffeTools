export function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
};

export function urlExists(url, callback) {
  fetch(url)
    .then((status) => callback(status.ok))
};
