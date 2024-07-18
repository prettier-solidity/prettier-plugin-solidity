import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

const postProcess = (options) => (properties) => ({
  variant: printString(properties.variant.slice(1, -1), options)
});

export class StringLiteral extends SlangNode {
  get kind() {
    return NonterminalKind.StringLiteral;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = () => ({
      variant: ast.variant.text
    });

    this.initialize(ast, offset, fetch, postProcess(options));
  }

  print() {
    return this.variant;
  }
}
