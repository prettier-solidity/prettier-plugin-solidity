import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { TupleDeconstructionElement } from './TupleDeconstructionElement.js';

export class TupleDeconstructionElements extends SlangNode {
  get kind() {
    return NonterminalKind.TupleDeconstructionElements;
  }

  items;

  separators;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new TupleDeconstructionElement(item, childrenOffsets.shift(), options)
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return printSeparatedList(path.map(print, 'items'));
  }
}
