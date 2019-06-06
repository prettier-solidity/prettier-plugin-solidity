const clean = require('../src/clean');

test('nodes list to match snapshot', () => {
  let toCleanse = {
    somethingElse: 'somethingElse',
    code: 'Lorem Ipsum',
    codeStart: 0,
    loc: { locEnd: 0, locStart: 1 },
    range: [0, 1]
  };
  expect(toCleanse).toHaveProperty('code');
  expect(toCleanse).toHaveProperty('codeStart');
  expect(toCleanse).toHaveProperty('loc');
  expect(toCleanse).toHaveProperty('range');
  expect(toCleanse).toHaveProperty('somethingElse');
  clean('ast', toCleanse, 'parent');
  expect(toCleanse).not.toHaveProperty('code');
  expect(toCleanse).not.toHaveProperty('codeStart');
  expect(toCleanse).not.toHaveProperty('loc');
  expect(toCleanse).not.toHaveProperty('range');
  expect(toCleanse).toHaveProperty('somethingElse');
});
