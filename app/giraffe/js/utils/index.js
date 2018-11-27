export function getCookie(name) {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie
    .split(";")
    .map(c => c.trim())
    .filter(c => c.startsWith(name + "="));

  if (xsrfCookies.length === 0) {
    return null;
  }

  return decodeURIComponent(xsrfCookies[0].split("=")[1]);
}

var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
export function validateEmail(email) {
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
