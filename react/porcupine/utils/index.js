export function isUUID(str) {
  let match =
    typeof str === "string" &&
    str.match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    );
  return match != null && str == match[0];
}

export function isGitHash(hash) {
  return /^[0-9a-f]{7,40}$/i.test(hash);
}

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
