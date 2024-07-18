import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

export class UsingOperator extends SlangNode {
  get kind() {
    return NonterminalKind.UsingOperator;
  }

  variant;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      variant: ast.variant.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return this.variant;
  }
}
