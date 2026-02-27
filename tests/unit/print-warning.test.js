import slangParse from '../../src/slangSolidityParser.js';

test('If parser ANTLR is used, print a warning.', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const text = 'contract    CheckPackage {}';
  const options = { parser: 'antlr' };
  slangParse(text, options);

  expect(consoleSpy).toHaveBeenCalled();
});
