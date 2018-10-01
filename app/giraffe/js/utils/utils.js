export function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

export function urlExists(url, callback) {
  fetch(url).then(status => callback(status.ok));
}

export function groupByDate(commits) {
  return commits.reduce((result, { commit }) => {
    let date = new Date(commit.author.date).toDateString();
    if (!result[date]) {
      result[date] = [{ commit }];
    } else {
      result[date].push({ commit });
    }
    return result;
  }, {});
}
