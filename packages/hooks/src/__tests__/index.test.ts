import * as encodeHooks from '..';

describe('encode hooks is defined', () => {
  test('encode hooks should be defined', () => {
    Object.keys(encodeHooks).forEach((module) => {
      expect(encodeHooks[module]).toBeDefined;
    });
  });
});
