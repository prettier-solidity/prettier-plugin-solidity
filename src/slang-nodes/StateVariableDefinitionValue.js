import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

export class StateVariableDefinitionValue extends SlangNode {
  equal;

  value;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.equal = ast.equal.text;
    this.value = parse(ast.value, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return this.value.variant.kind === 'ArrayExpression'
      ? [` ${this.equal} `, path.call(print, 'value')]
      : group([` ${this.equal}`, indent([line, path.call(print, 'value')])]);
  }
}
