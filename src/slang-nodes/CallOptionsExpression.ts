import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { Expression } from './Expression.js';
import { CallOptions } from './CallOptions.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class CallOptionsExpression implements SlangNode {
  readonly kind = NonterminalKind.CallOptionsExpression;

  comments;

  loc;

  operand: Expression;

  openBrace: string;

  options: CallOptions;

  closeBrace: string;

  constructor(
    ast: ast.CallOptionsExpression,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.operand = new Expression(ast.operand, offsets[0], options);
    this.openBrace = ast.openBrace.text;
    this.options = new CallOptions(ast.options, offsets[1], options);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.operand, this.options]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      path.call(print, 'operand'),
      this.openBrace,
      path.call(print, 'options'),
      this.closeBrace
    ];
  }
}
