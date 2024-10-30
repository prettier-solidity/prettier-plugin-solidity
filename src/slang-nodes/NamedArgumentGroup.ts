import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { NamedArguments } from './NamedArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class NamedArgumentGroup implements SlangNode {
  readonly kind = NonterminalKind.NamedArgumentGroup;

  comments;

  loc;

  arguments: NamedArguments;

  constructor(
    ast: ast.NamedArgumentGroup,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.arguments = new NamedArguments(ast.arguments, offsets[0], options);

    metadata = updateMetadata(metadata, [this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<NamedArgumentGroup>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'arguments'), '}'];
  }
}
