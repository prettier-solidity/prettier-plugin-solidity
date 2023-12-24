import type { FileLevelConstant as IFileLevelConstant } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const FileLevelConstant: NodePrinter<IFileLevelConstant> = {
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    ' constant ',
    node.name,
    ' = ',
    path.call(print, 'initialValue'),
    ';'
  ]
};
