import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

export class StateVariableDefinitionValue extends SlangNode {
  equal;

  value;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return this.value.variant.kind === 'ArrayExpression'
      ? [` ${this.equal} `, path.call(print, 'value')]
      : group([` ${this.equal}`, indent([line, path.call(print, 'value')])]);
  }
}
