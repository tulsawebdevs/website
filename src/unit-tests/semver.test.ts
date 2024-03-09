import { it, expect } from 'vitest';
import { parseVersion, compareVersion } from '../features/semver.ts';

it.each([
  ['v1', { major: '1', minor: '', patch: '', full: '1', prefixed: 'v1' }],
  [
    'v1.2',
    { major: '1', minor: '2', patch: '', full: '1.2', prefixed: 'v1.2' },
  ],
  [
    'v1.2.3',
    { major: '1', minor: '2', patch: '3', full: '1.2.3', prefixed: 'v1.2.3' },
  ],
  ['', undefined],
  ['v0', { major: '0', minor: '', patch: '', full: '0', prefixed: 'v0' }],
  [
    'v0.0',
    { major: '0', minor: '0', patch: '', full: '0.0', prefixed: 'v0.0' },
  ],
  [
    'v0.0.0',
    { major: '0', minor: '0', patch: '0', full: '0.0.0', prefixed: 'v0.0.0' },
  ],
])('parseVersion(%s) returns %o', (input, expected) => {
  expect(parseVersion(input)).toEqual(expected);
});

it.each([
  { a: 'v1', b: 'v2', expected: -1 },
  { a: 'v2', b: 'v1', expected: 1 },
  { a: 'v1', b: 'v1', expected: 0 },
  { a: 'v1.1', b: 'v1.2', expected: -1 },
  { a: 'v1.2', b: 'v1.1', expected: 1 },
  { a: 'v1.1', b: 'v1.1', expected: 0 },
  { a: 'v1.1', b: 'v1.1.1', expected: -1 },
  { a: 'v1.1.1', b: 'v1.1', expected: 1 },
  { a: 'v1.1.1', b: 'v1.1.1', expected: 0 },
  { a: 'v1.1.1', b: 'v1.1.2', expected: -1 },
  { a: 'v2.1.2', b: 'v1.1.2', expected: 1 },
  { a: '', b: '', expected: 0 },
  { a: '', b: 'v0', expected: 0 },
  { a: '', b: 'v1', expected: -1 },
  { a: 'v0', b: '', expected: 0 },
])('compareVersion(%o, %o) returns %o', ({ a, b, expected }, id) => {
  const result = compareVersion(parseVersion(a), parseVersion(b));
  expect(result === expected, `${a} vs ${b} => ${result} !== ${expected}`);
});
