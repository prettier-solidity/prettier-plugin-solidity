import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';

export class VersionComparator extends SlangNode {
  get kind() {
    return NonterminalKind.VersionComparator;
  }

  operator;

  operand;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      operator: ast.operator.text,
      operand: new VersionExpression(
        ast.operand,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
