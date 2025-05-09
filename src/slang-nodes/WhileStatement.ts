import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class WhileStatement implements SlangNode {
  readonly kind = NonterminalKind.WhileStatement;

  comments;

  loc;

  condition: Expression;

  body: Statement;

  constructor(ast: ast.WhileStatement) {
    let metadata = getNodeMetadata(ast);

    this.condition = new Expression(ast.condition);
    this.body = new Statement(ast.body);

    metadata = updateMetadata(metadata, [this.condition, this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<WhileStatement>, print: PrintFunction): Doc {
    return [
      'while (',
      printSeparatedItem(path.call(print, 'condition')),
      ')',
      this.body.variant.kind === NonterminalKind.Block
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]))
    ];
  }
}
