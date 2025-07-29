import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class WhileStatement extends SlangNode {
  readonly kind = NonterminalKind.WhileStatement;

  condition: Expression['variant'];

  body: Statement['variant'];

  constructor(ast: ast.WhileStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.condition = extractVariant<typeof Expression>(
      Expression,
      ast.condition,
      options
    );
    this.body = extractVariant<typeof Statement>(Statement, ast.body, options);

    this.updateMetadata(this.condition, this.body);
  }

  print(path: AstPath<WhileStatement>, print: PrintFunction): Doc {
    const body = path.call(print, 'body');
    return [
      'while (',
      printSeparatedItem(path.call(print, 'condition')),
      ')',
      this.body.kind === NonterminalKind.Block
        ? [' ', body]
        : group(indent([line, body]))
    ];
  }
}
