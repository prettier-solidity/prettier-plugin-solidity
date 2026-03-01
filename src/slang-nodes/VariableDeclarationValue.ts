import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { isMultilineString } from '../slang-utils/is-multiline-string.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class VariableDeclarationValue extends SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationValue;

  expression: Expression['variant'];

  constructor(
    ast: ast.VariableDeclarationValue,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.expression = extractVariant(
      new Expression(ast.expression, collected, options)
    );

    this.updateMetadata(this.expression);
  }

  print(path: AstPath<VariableDeclarationValue>, print: PrintFunction): Doc {
    return [
      ' =',
      printIndentedGroupOrSpacedDocument(
        path.call(print, 'expression'),
        !(this.expression instanceof TerminalNode) &&
          isMultilineString(this.expression)
      )
    ];
  }
}
