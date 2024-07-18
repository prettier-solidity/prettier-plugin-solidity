import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Block } from './Block.js';

export class UncheckedBlock extends SlangNode {
  get kind() {
    return NonterminalKind.UncheckedBlock;
  }

  uncheckedKeyword;

  block;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      uncheckedKeyword: ast.uncheckedKeyword.text,
      block: new Block(ast.block, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.uncheckedKeyword} `, path.call(print, 'block')];
  }
}
