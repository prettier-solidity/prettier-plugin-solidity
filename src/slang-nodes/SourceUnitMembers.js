import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMember } from './SourceUnitMember.js';

export class SourceUnitMembers extends SlangNode {
  get kind() {
    return NonterminalKind.SourceUnitMembers;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) => new SourceUnitMember(item, childrenOffsets.shift(), options)
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print, options) {
    return printPreservingEmptyLines(path, 'items', options, print);
  }
}
