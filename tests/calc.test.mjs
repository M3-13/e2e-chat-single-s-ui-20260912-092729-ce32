import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTip } from '../calc.js';

test('calculateTip ist eine Funktion', () => {
  assert.strictEqual(typeof calculateTip, 'function');
});
