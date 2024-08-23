import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class PrefixExpression implements SlangNode {
  readonly kind = NonterminalKind.PrefixExpression;

  comments;

  loc;

  operator: string;

  operand: Expression;

  constructor(ast: ast.PrefixExpression, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.operator = ast.operator.text;
    this.operand = new Expression(ast.operand, options);

    metadata = updateMetadata(metadata, [this.operand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    if (this.operator === 'delete') {
      this.operator = `${this.operator} `;
    }
  }

  print(path: AstPath<PrefixExpression>, print: PrintFunction): Doc {
    return [this.operator, path.call(print, 'operand')];
  }
}
