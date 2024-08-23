import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class VariableDeclarationValue implements SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationValue;

  comments;

  loc;

  expression: Expression;

  constructor(
    ast: ast.VariableDeclarationValue,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.expression = new Expression(ast.expression, options);

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VariableDeclarationValue>, print: PrintFunction): Doc {
    return [' = ', path.call(print, 'expression')];
  }
}
