import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class DoWhileStatement extends SlangNode {
  readonly kind = NonterminalKind.DoWhileStatement;

  body: Statement;

  condition: Expression;

  constructor(ast: ast.DoWhileStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.body = new Statement(ast.body, options);
    this.condition = new Expression(ast.condition, options);

    this.updateMetadata(this.body, this.condition);
  }

  print(path: AstPath<DoWhileStatement>, print: PrintFunction): Doc {
    const body = path.call(printVariant(print), 'body');
    return [
      'do',
      this.body.variant.kind === NonterminalKind.Block
        ? [' ', body, ' ']
        : printSeparatedItem(body, { firstSeparator: line }),
      'while (',
      printSeparatedItem(path.call(printVariant(print), 'condition')),
      ');'
    ];
  }
}
