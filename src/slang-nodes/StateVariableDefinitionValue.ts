import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class StateVariableDefinitionValue extends SlangNode {
  readonly kind = NonterminalKind.StateVariableDefinitionValue;

  value: Expression['variant'];

  constructor(
    ast: ast.StateVariableDefinitionValue,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.value = extractVariant<typeof Expression>(
      Expression,
      ast.value,
      options
    );

    this.updateMetadata(this.value);
  }

  print(
    path: AstPath<StateVariableDefinitionValue>,
    print: PrintFunction
  ): Doc {
    const value = path.call(print, 'value');
    return this.value.kind === NonterminalKind.ArrayExpression
      ? [' = ', value]
      : group([' =', indent([line, value])]);
  }
}
