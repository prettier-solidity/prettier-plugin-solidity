import type { ArrayTypeName as IArrayTypeName } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const ArrayTypeName: NodePrinter<IArrayTypeName> = {
  print: ({ path, print }) => [
    path.call(print, 'baseTypeName'),
    '[',
    path.call(print, 'length'),
    ']'
  ]
};
