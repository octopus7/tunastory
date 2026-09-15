import test from 'node:test';
import assert from 'node:assert/strict';

import * as galleryComparison from '../src/lib/gallery-comparison.mjs';
const { getComparisonLabel } = galleryComparison;

test('returns A or B for lettered 2.5 variants', () => {
  assert.equal(getComparisonLabel('vertical-07-eye-level_2_5_A.png'), 'A');
  assert.equal(getComparisonLabel('vertical-07-eye-level_2_5_B.png'), 'B');
});

test('returns the sparkle label for an unlettered 2.5 variant', () => {
  assert.equal(getComparisonLabel('LibraryCapsule3_2_5.png'), String.fromCodePoint(0x2728));
});

test('returns null for an image without a 2.5 suffix', () => {
  assert.equal(getComparisonLabel('vertical-07-eye-level.png'), null);
});

test('clips the improved image from the divider position to the right', () => {
  assert.equal(galleryComparison.getComparisonClipPath?.(20), 'inset(0 0 0 20%)');
  assert.equal(galleryComparison.getComparisonClipPath?.(50), 'inset(0 0 0 50%)');
});
