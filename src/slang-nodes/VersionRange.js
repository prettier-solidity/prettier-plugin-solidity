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

    const fetch = (offsets) => ({
      leftOperand: new VersionExpression(ast.leftOperand, offsets[0], options),
      operator: ast.operator.text,
      rightOperand: new VersionExpression(ast.rightOperand, offsets[1], options)
    });

    this.initialize(ast, offset, fetch);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: VersionRange'];
  }
}
