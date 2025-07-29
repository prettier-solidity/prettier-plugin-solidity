import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class StateVariableDefinitionValue extends SlangNode {
  readonly kind = NonterminalKind.StateVariableDefinitionValue;

  value: Expression;

  constructor(
    ast: ast.StateVariableDefinitionValue,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.value = new Expression(ast.value, options);

    this.updateMetadata(this.value);
  }

  print(
    path: AstPath<StateVariableDefinitionValue>,
    print: PrintFunction
  ): Doc {
    return [
      ' =',
      printIndentedGroupOrSpacedDocument(
        path.call(printVariant(print), 'value'),
        this.value.variant.kind !== NonterminalKind.ArrayExpression
      )
    ];
  }
}
