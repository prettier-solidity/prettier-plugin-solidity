import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';

const { join } = doc.builders;

export class VersionExpressionSet extends SlangNode {
  get kind() {
    return NonterminalKind.VersionExpressionSet;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) => new VersionExpression(item, childrenOffsets.shift(), options)
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return join(' ', path.map(print, 'items'));
  }
}
