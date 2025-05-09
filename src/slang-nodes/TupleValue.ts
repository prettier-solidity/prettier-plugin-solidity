import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class TupleValue implements SlangNode {
  readonly kind = NonterminalKind.TupleValue;

  comments;

  loc;

  expression?: Expression;

  constructor(ast: ast.TupleValue) {
    let metadata = getNodeMetadata(ast);

    if (ast.expression) {
      this.expression = new Expression(ast.expression);
    }

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TupleValue>, print: PrintFunction): Doc {
    return path.call(print, 'expression');
  }
}
