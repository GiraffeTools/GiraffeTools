export function isUUID(s) {
  return (
    s instanceof String &&
    s.matches(
      "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
    )
  );
}

export function isGitHash(hash) {
  return /^[0-9a-f]{7,40}$/i.test(hash);
}
