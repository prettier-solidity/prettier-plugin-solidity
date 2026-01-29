import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class DoWhileStatement extends SlangNode {
  readonly kind = NonterminalKind.DoWhileStatement;

  body: Statement['variant'];

  condition: Expression['variant'];

  constructor(
    ast: ast.DoWhileStatement,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.body = extractVariant(new Statement(ast.body, collected, options));
    this.condition = extractVariant(
      new Expression(ast.condition, collected, options)
    );

    this.updateMetadata(this.body, this.condition);
  }

  print(path: AstPath<DoWhileStatement>, print: PrintFunction): Doc {
    const body = path.call(print, 'body');
    return [
      'do',
      this.body.kind === NonterminalKind.Block
        ? [' ', body, ' ']
        : printSeparatedItem(body, { firstSeparator: line }),
      'while (',
      printSeparatedItem(path.call(print, 'condition')),
      ');'
    ];
  }
}
