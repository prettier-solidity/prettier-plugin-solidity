import { printSeparatedList } from '../common/printer-helpers.js';
import { locEnd } from '../common/util.js';
import type { AssemblyCall as IAssemblyCall } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const AssemblyCall: NodePrinter<IAssemblyCall> = {
  print: ({ node, path, print, options }) =>
    node.arguments.length === 0 &&
    options.originalText.charAt(locEnd(node)) !== ')'
      ? node.functionName
      : [
          `${node.functionName}(`,
          printSeparatedList(path.map(print, 'arguments')),
          ')'
        ]
};
