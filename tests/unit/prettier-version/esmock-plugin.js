import esmock from 'esmock';
import getPrettier from '../../config/get-prettier.js';

const prettier = await getPrettier();

const esmockPlugin = async () => {
  const prettierMock = { ...prettier, version: '2.2.1' };

  const pluginPath = process.env.TEST_STANDALONE
    ? '../../../dist/standalone.js'
    : '../../../src/index.ts';

  const mockedObject = process.env.TEST_STANDALONE
    ? { 'prettier/standalone': prettierMock }
    : { prettier: prettierMock };

  const plugin = await esmock(pluginPath, {}, mockedObject);

  return { plugin, prettierMock };
};

export default esmockPlugin;
