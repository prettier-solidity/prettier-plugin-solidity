import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class VariableDeclarationValue implements SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationValue;

  comments;

  loc;

  expression: Expression;

  constructor(
    ast: ast.VariableDeclarationValue,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.expression = new Expression(ast.expression, offsets[0], options);

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VariableDeclarationValue>, print: PrintFunction): Doc {
    return [' = ', path.call(print, 'expression')];
  }
}
