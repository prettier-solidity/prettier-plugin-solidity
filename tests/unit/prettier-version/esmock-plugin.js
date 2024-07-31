import esmock from 'esmock';
import prettier from 'prettier';

const esmockPlugin = async () => {
  const prettierMock = { ...prettier, version: '2.2.1' };

  const plugin = await esmock(
    '../../../src/index.ts',
    {},
    {
      prettier: prettierMock
    }
  );

  return { plugin, prettierMock };
};

export default esmockPlugin;
