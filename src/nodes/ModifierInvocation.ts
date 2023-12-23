import {
  printComments,
  printSeparatedList
} from '../common/printer-helpers.js';
import type { ModifierInvocation as IModifierInvocation } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { NodePrinter } from './types';

const modifierArguments = (
  node: IModifierInvocation,
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
): Doc => {
  if (node.arguments) {
    // We always print parentheses at this stage because the parser already
    // stripped them in FunctionDefinitions that are not a constructor.
    return node.arguments.length > 0
      ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
      : '()';
  }

  const comments = printComments(node, path, options);
  if (comments.length) {
    // We print parentheses here because the comment is supposed to be a block
    // comment inside empty parentheses.
    //    modifier(/* comment */)
    return ['(', comments, ')'];
  }

  return '';
};

export const ModifierInvocation: NodePrinter<IModifierInvocation> = {
  print: ({ node, path, print, options }) => [
    node.name,
    modifierArguments(node, path, print, options)
  ]
};
