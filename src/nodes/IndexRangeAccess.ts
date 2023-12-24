import type { IndexRangeAccess as IIndexRangeAccess } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const IndexRangeAccess: NodePrinter<IIndexRangeAccess> = {
  print: ({ path, print }) => [
    path.call(print, 'base'),
    '[',
    path.call(print, 'indexStart'),
    ':',
    path.call(print, 'indexEnd'),
    ']'
  ]
};
