import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTip } from '../calc.js';

test('calculateTip ist eine Funktion', () => {
  assert.strictEqual(typeof calculateTip, 'function');
});

test('berechnet Trinkgeld, Gesamt und pro Person für 100/10/2', () => {
  assert.deepStrictEqual(calculateTip(100, 10, 2), {
    tip: 10,
    total: 110,
    perPerson: 55,
  });
});

test('rundet kaufmännisch auf zwei Nachkommastellen', () => {
  assert.deepStrictEqual(calculateTip(19.99, 12.5, 3), {
    tip: 2.5,
    total: 22.49,
    perPerson: 7.5,
  });
});

test('rundet einen sich wiederholenden Betrag korrekt', () => {
  assert.deepStrictEqual(calculateTip(100, 33.333, 3), {
    tip: 33.33,
    total: 133.33,
    perPerson: 44.44,
  });
});

test('gibt null bei 0 Personen zurück', () => {
  assert.strictEqual(calculateTip(100, 10, 0), null);
});

test('gibt null bei gebrochener Personenzahl zurück', () => {
  assert.strictEqual(calculateTip(100, 10, 1.5), null);
});

test('gibt null bei negativem Betrag zurück', () => {
  assert.strictEqual(calculateTip(-5, 10, 2), null);
});

test('gibt null bei negativem Prozentwert zurück', () => {
  assert.strictEqual(calculateTip(100, -5, 2), null);
});

test('gibt null bei NaN zurück', () => {
  assert.strictEqual(calculateTip(NaN, 10, 2), null);
  assert.strictEqual(calculateTip(100, NaN, 2), null);
  assert.strictEqual(calculateTip(100, 10, NaN), null);
});

test('gibt null bei Text zurück', () => {
  assert.strictEqual(calculateTip('abc', 10, 2), null);
});

test('gibt null bei fehlenden Werten zurück', () => {
  assert.strictEqual(calculateTip(undefined, 10, 2), null);
  assert.strictEqual(calculateTip(100, undefined, 2), null);
  assert.strictEqual(calculateTip(100, 10, undefined), null);
});

test('gibt null bei Infinity zurück', () => {
  assert.strictEqual(calculateTip(Infinity, 10, 2), null);
});

test('berechnet korrekt für eine Person', () => {
  assert.deepStrictEqual(calculateTip(50, 10, 1), {
    tip: 5,
    total: 55,
    perPerson: 55,
  });
});
