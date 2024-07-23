import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { UnicodeStringLiteral } from './UnicodeStringLiteral.js';

const { join, hardline } = doc.builders;

export class UnicodeStringLiterals extends SlangNode {
  get kind() {
    return NonterminalKind.UnicodeStringLiterals;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      items: ast.items.map(
        (item, index) => new UnicodeStringLiteral(item, offsets[index], options)
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
