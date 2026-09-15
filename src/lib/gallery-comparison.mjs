export function getComparisonLabel(filename) {
  const match = filename.match(/_2_5(?:_([ab]))?(?=\.[^.]+$)/i);

  if (!match) return null;
  return match[1]?.toUpperCase() ?? String.fromCodePoint(0x2728);
}

export function getComparisonClipPath(position) {
  const normalized = Math.min(100, Math.max(0, position));
  return `inset(0 0 0 ${normalized}%)`;
}
