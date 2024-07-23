import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { InheritanceType } from './InheritanceType.js';

const { line } = doc.builders;

export class InheritanceTypes extends SlangNode {
  get kind() {
    return NonterminalKind.InheritanceTypes;
  }

  items;

  separators;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      items: ast.items.map(
        (item, index) => new InheritanceType(item, offsets[index], options)
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: line
    });
  }
}
