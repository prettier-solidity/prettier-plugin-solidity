import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { FunctionAttribute } from './FunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { line } = doc.builders;

export class FunctionAttributes implements SlangNode {
  readonly kind = NonterminalKind.FunctionAttributes;

  comments;

  loc;

  items: FunctionAttribute[];

  constructor(ast: ast.FunctionAttributes, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new FunctionAttribute(item, options));

    [this.loc, this.comments] = updateMetadata(metadata, [this.items]);

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<FunctionAttributes>, print: PrintFunction): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
