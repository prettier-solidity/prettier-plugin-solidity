import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class NamedArgument implements SlangNode {
  readonly kind = NonterminalKind.NamedArgument;

  comments;

  loc;

  name: string;

  value: Expression;

  constructor(
    ast: ast.NamedArgument,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = ast.name.text;
    this.value = new Expression(ast.value, offsets[0], options);

    metadata = updateMetadata(metadata, [this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<NamedArgument>, print: PrintFunction): Doc {
    return [`${this.name}: `, path.call(print, 'value')];
  }
}
