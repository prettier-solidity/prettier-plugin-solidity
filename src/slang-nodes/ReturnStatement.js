import { doc } from 'prettier';
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
  returnKeyword;

  expression;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      returnKeyword: ast.returnKeyword.text,
      expression: ast.expression
        ? new Expression(
            ast.expression,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,

      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print, options) {
    return [
      this.returnKeyword,
      printExpression(this, path, print, options),
      this.semicolon
    ];
  }
}
