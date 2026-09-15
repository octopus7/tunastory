export function getComparisonLabel(filename) {
  const match = filename.match(/_2_5(?:_([ab]))?(?=\.[^.]+$)/i);

  if (!match) return null;
  return match[1]?.toUpperCase() ?? String.fromCodePoint(0x2728);
}
