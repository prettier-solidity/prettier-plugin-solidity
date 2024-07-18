import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

export class FunctionName extends SlangNode {
  get kind() {
    return NonterminalKind.FunctionName;
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
