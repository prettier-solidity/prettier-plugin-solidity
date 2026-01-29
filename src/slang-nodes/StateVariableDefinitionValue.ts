import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class StateVariableDefinitionValue extends SlangNode {
  readonly kind = NonterminalKind.StateVariableDefinitionValue;

  value: Expression['variant'];

  constructor(
    ast: ast.StateVariableDefinitionValue,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.value = extractVariant(new Expression(ast.value, collected, options));

    this.updateMetadata(this.value);
  }

  print(
    path: AstPath<StateVariableDefinitionValue>,
    print: PrintFunction
  ): Doc {
    return [
      ' =',
      printIndentedGroupOrSpacedDocument(
        path.call(print, 'value'),
        this.value.kind !== NonterminalKind.ArrayExpression
      )
    ];
  }
}
