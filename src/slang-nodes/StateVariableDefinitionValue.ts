import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class StateVariableDefinitionValue implements SlangNode {
  readonly kind = NonterminalKind.StateVariableDefinitionValue;

  comments;

  loc;

  value: Expression;

  constructor(
    ast: ast.StateVariableDefinitionValue,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.value = new Expression(ast.value, options);

    metadata = updateMetadata(metadata, [this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<StateVariableDefinitionValue>,
    print: PrintFunction
  ): Doc {
    return this.value.variant.kind === NonterminalKind.ArrayExpression
      ? [' = ', path.call(print, 'value')]
      : group([' =', indent([line, path.call(print, 'value')])]);
  }
}
