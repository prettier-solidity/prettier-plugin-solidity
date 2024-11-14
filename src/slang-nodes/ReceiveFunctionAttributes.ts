import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ReceiveFunctionAttribute } from './ReceiveFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { line } = doc.builders;

export class ReceiveFunctionAttributes implements SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionAttributes;

  comments;

  loc;

  items: ReceiveFunctionAttribute[];

  constructor(
    ast: ast.ReceiveFunctionAttributes,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map(
      (item) => new ReceiveFunctionAttribute(item, options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<ReceiveFunctionAttributes>, print: PrintFunction): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
