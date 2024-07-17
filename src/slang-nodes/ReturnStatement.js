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

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { returnKeyword, expression, semicolon } = ast;
      this.returnKeyword = returnKeyword.text;
      if (expression) {
        this.expression = new Expression(
          expression,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print, options) {
    return [
      this.returnKeyword,
      printExpression(this, path, print, options),
      this.semicolon
    ];
  }
}
