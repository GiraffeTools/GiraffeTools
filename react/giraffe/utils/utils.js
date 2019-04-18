export function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

export async function urlExists(url, callback) {
  const status = await fetch(url);
  callback(status.ok);
}

export function groupByDate(commits) {
  return commits.reduce((result, commit) => {
    let date = new Date(commit.commit.author.date).toDateString();
    if (!result[date]) {
      result[date] = [{ commit }];
    } else {
      result[date].push({ commit });
    }
    return result;
  }, {});
}

export function validateEmail(email) {
  var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = tester.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function(part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}
