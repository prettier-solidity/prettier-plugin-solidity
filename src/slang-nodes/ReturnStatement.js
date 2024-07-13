import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

const expression = (node, path, print, options) => {
  if (node.expression) {
    return node.expression.variant.kind === 'TupleExpression' ||
      (options.experimentalTernaries &&
        node.expression.variant.kind === 'ConditionalExpression')
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
};

export class ReturnStatement extends SlangNode {
  returnKeyword;

  expression;

  semicolon;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.returnKeyword = ast.returnKeyword.text;
    this.expression = ast.expression
      ? parse(ast.expression, parse, this.nextChildOffset)
      : undefined;
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print({ path, print, options }) {
    return [
      this.returnKeyword,
      expression(this, path, print, options),
      this.semicolon
    ];
  }
}
