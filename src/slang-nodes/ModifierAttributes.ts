import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ModifierAttribute } from './ModifierAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

const { line } = doc.builders;

export class ModifierAttributes implements SlangNode {
  readonly kind = NonterminalKind.ModifierAttributes;

  comments;

  loc;

  items: ModifierAttribute[];

  constructor(ast: ast.ModifierAttributes, offset: number) {
    let metadata = getNodeMetadata(ast, offset, true);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new ModifierAttribute(item, offsets[index])
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<ModifierAttributes>, print: PrintFunction): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
