import { doc } from 'prettier';
import { printString } from '../common/util.js';
import type { HexLiteral as IHexLiteral } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { join, line } = doc.builders;

export const HexLiteral: NodePrinter<IHexLiteral> = {
  print: ({ node, options }) =>
    join(
      line,
      node.parts.map((part) => ['hex', printString(part, options)])
    )
};
