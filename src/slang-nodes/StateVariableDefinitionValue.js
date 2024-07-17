import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const { group, indent, line } = doc.builders;

export class StateVariableDefinitionValue extends SlangNode {
  equal;

  value;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      equal: ast.equal.text,
      value: new Expression(ast.value, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return this.value.variant.kind === 'ArrayExpression'
      ? [` ${this.equal} `, path.call(print, 'value')]
      : group([` ${this.equal}`, indent([line, path.call(print, 'value')])]);
  }
}
