import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const { group, indent, line } = doc.builders;

function printExpression(node, path, print, options) {
  if (node.expression) {
    return node.expression.variant.kind === 'TupleExpression' ||
      (options.experimentalTernaries &&
        node.expression.variant.kind === 'ConditionalExpression')
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
}

export class ReturnStatement extends SlangNode {
  get kind() {
    return NonterminalKind.ReturnStatement;
  }

  returnKeyword;

  expression;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      returnKeyword: ast.returnKeyword.text,
      expression: ast.expression
        ? new Expression(ast.expression, offsets[0], options)
        : undefined,

      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print, options) {
    return [
      this.returnKeyword,
      printExpression(this, path, print, options),
      this.semicolon
    ];
  }
}
