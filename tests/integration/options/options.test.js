import getPrettier from '../../config/get-prettier.js';
import getPlugins from '../../config/get-plugins.js';

const prettier = await getPrettier();
const plugins = await getPlugins();

test('Prettier should report the supported options when multiple plugins are given', async () => {
  const supportedOptionsNames = (
    await prettier.getSupportInfo({ plugins })
  ).options.map((option) => option.name);

  expect(supportedOptionsNames).toContain('printWidth');
  expect(supportedOptionsNames).toContain('tabWidth');
  expect(supportedOptionsNames).toContain('useTabs');
  expect(supportedOptionsNames).toContain('bracketSpacing');
  expect(supportedOptionsNames).toContain('singleQuote');
  expect(supportedOptionsNames).toContain('experimentalTernaries');
  expect(supportedOptionsNames).toContain('experimentalOperatorPosition');
  expect(supportedOptionsNames).toContain('compiler');
});

test('Prettier should report the supported options when a single plugin is given', async () => {
  const solidityPlugin = plugins[plugins.length - 1];
  const supportedOptionsNames = (
    await prettier.getSupportInfo({
      plugins: [solidityPlugin]
    })
  ).options.map((option) => option.name);

  expect(supportedOptionsNames).toContain('printWidth');
  expect(supportedOptionsNames).toContain('tabWidth');
  expect(supportedOptionsNames).toContain('useTabs');
  expect(supportedOptionsNames).toContain('bracketSpacing');
  expect(supportedOptionsNames).toContain('singleQuote');
  expect(supportedOptionsNames).toContain('experimentalTernaries');
  expect(supportedOptionsNames).toContain('experimentalOperatorPosition');
  expect(supportedOptionsNames).toContain('compiler');
});
