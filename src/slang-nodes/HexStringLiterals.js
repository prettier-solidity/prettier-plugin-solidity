import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';

const { join, hardline } = doc.builders;

export class HexStringLiterals extends SlangNode {
  get kind() {
    return NonterminalKind.HexStringLiterals;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) => new HexStringLiteral(item, childrenOffsets.shift(), options)
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
