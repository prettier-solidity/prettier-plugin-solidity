import { doc } from 'prettier';
import type { AssemblyFor as IAssemblyFor } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { join } = doc.builders;

export const AssemblyFor: NodePrinter<IAssemblyFor> = {
  print: ({ path, print }) =>
    join(' ', [
      'for',
      path.call(print, 'pre'),
      path.call(print, 'condition'),
      path.call(print, 'post'),
      path.call(print, 'body')
    ])
};
