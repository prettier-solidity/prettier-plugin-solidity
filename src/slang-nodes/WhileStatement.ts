import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class WhileStatement extends SlangNode {
  readonly kind = NonterminalKind.WhileStatement;

  condition: Expression['variant'];

  body: Statement['variant'];

  constructor(ast: ast.WhileStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.condition = extractVariant(new Expression(ast.condition, options));
    this.body = extractVariant(new Statement(ast.body, options));

    this.updateMetadata(this.condition, this.body);
  }

  print(path: AstPath<WhileStatement>, print: PrintFunction): Doc {
    return [
      'while (',
      printSeparatedItem(path.call(print, 'condition')),
      ')',
      printIndentedGroupOrSpacedDocument(
        path.call(print, 'body'),
        this.body.kind !== NonterminalKind.Block
      )
    ];
  }
}
