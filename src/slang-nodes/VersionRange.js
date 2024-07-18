import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';

export class VersionRange extends SlangNode {
  get kind() {
    return NonterminalKind.VersionRange;
  }

  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      leftOperand: new VersionExpression(
        ast.leftOperand,
        childrenOffsets.shift(),
        options
      ),
      operator: ast.operator.text,
      rightOperand: new VersionExpression(
        ast.rightOperand,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: VersionRange'];
  }
}
