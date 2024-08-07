import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

const { group, indent, line } = doc.builders;

export class StateVariableDefinitionValue implements SlangNode {
  readonly kind = NonterminalKind.StateVariableDefinitionValue;

  comments;

  loc;

  value: Expression;

  constructor(
    ast: ast.StateVariableDefinitionValue,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.value = new Expression(ast.value, offsets[0], options);

    metadata = updateMetadata(metadata, [this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<StateVariableDefinitionValue>,
    print: PrintFunction
  ): Doc {
    return typeof this.value.variant !== 'string' &&
      this.value.variant.kind === NonterminalKind.ArrayExpression
      ? [' = ', path.call(print, 'value')]
      : group([' =', indent([line, path.call(print, 'value')])]);
  }
}
