import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent, line } = doc.builders;

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
    const body = path.call(print, 'body');
    return [
      'do',
      this.body.variant.kind === NonterminalKind.Block
        ? [' ', body, ' ']
        : group([indent([line, body]), line]),
      'while (',
      printSeparatedItem(path.call(print, 'condition')),
      ');'
    ];
  }
}
