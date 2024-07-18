import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { hardline } = doc.builders;

export class EnumMembers extends SlangNode {
  get kind() {
    return NonterminalKind.EnumMembers;
  }

  items;

  separators;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      items: ast.items.map((item) => item.text),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return printSeparatedList(this.items, { firstSeparator: hardline });
  }
}
