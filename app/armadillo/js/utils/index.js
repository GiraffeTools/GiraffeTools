
export function isGitHash(hash) {
  return /^[0-9a-f]{7,40}$/i.test(hash);
}
