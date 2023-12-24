import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { UsingForDeclaration as IUsingForDeclaration } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { line, softline } = doc.builders;

export const UsingForDeclaration: NodePrinter<IUsingForDeclaration> = {
  print: ({ node, path, print, options }) => [
    'using ',
    node.functions.length
      ? [
          '{',
          printSeparatedList(
            node.functions.map((functionName, i) =>
              node.operators[i]
                ? `${functionName} as ${node.operators[i]}`
                : functionName
            ),
            { firstSeparator: options.bracketSpacing ? line : softline }
          ),
          '}'
        ]
      : node.libraryName!,
    ' for ',
    node.typeName ? path.call(print, 'typeName') : '*',
    node.isGlobal ? ' global;' : ';'
  ]
};
