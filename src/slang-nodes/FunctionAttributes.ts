import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { FunctionAttribute } from './FunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { line } = doc.builders;

export class FunctionAttributes implements SlangNode {
  readonly kind = NonterminalKind.FunctionAttributes;

  comments;

  loc;

  items: FunctionAttribute[];

  constructor(ast: ast.FunctionAttributes) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new FunctionAttribute(item));

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<FunctionAttributes>, print: PrintFunction): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
