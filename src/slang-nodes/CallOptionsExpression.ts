import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';
import { CallOptions } from './CallOptions.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class CallOptionsExpression implements SlangNode {
  readonly kind = NonterminalKind.CallOptionsExpression;

  comments;

  loc;

  operand: Expression;

  options: CallOptions;

  constructor(ast: ast.CallOptionsExpression, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.operand = new Expression(ast.operand, options);
    this.options = new CallOptions(ast.options, options);

    metadata = updateMetadata(metadata, [this.operand, this.options]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<CallOptionsExpression>, print: PrintFunction): Doc {
    return [path.call(print, 'operand'), '{', path.call(print, 'options'), '}'];
  }
}
