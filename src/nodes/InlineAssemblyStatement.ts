// @TODO: add support for assembly language specifier
import { printString } from '../common/util.js';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { InlineAssemblyStatement as IInlineAssemblyStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const InlineAssemblyStatement: NodePrinter<IInlineAssemblyStatement> = {
  print: ({ node, path, print, options }) => [
    `assembly ${node.language ? `${printString(node.language, options)} ` : ''}`,
    node.flags.length > 0
      ? [
          '(',
          printSeparatedList(
            node.flags.map((flag) => printString(flag, options))
          ),
          ') '
        ]
      : '',
    path.call(print, 'body')
  ]
};
