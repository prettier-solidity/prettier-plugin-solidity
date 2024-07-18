import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { postProcessFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { ModifierAttribute } from './ModifierAttribute.js';

const { line } = doc.builders;

export class ModifierAttributes extends SlangNode {
  get kind() {
    return NonterminalKind.ModifierAttributes;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) => new ModifierAttribute(item, childrenOffsets.shift(), options)
      )
    });

    this.initialize(ast, offset, fetch, postProcessFunctionAttributes);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
