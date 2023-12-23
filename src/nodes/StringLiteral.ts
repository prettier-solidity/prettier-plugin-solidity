import { doc } from 'prettier';
import { printString } from '../common/util.js';
import type { StringLiteral as IStringLiteral } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { join, hardline } = doc.builders;

export const StringLiteral: NodePrinter<IStringLiteral> = {
  print: ({ node, options }) => {
    const list = node.parts.map(
      (part, index) =>
        // node.isUnicode is an array of the same length as node.parts
        // that indicates if that string fragment has the unicode prefix
        `${node.isUnicode[index] ? 'unicode' : ''}${printString(part, options)}`
    );

    return join(hardline, list);
  }
};
