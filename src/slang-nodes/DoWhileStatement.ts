import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Statement } from './Statement.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class DoWhileStatement implements SlangNode {
  readonly kind = NonterminalKind.DoWhileStatement;

  comments;

  loc;

  body: Statement;

  condition: Expression;

  constructor(ast: ast.DoWhileStatement) {
    let metadata = getNodeMetadata(ast);

    this.body = new Statement(ast.body);
    this.condition = new Expression(ast.condition);

    metadata = updateMetadata(metadata, [this.body, this.condition]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<DoWhileStatement>, print: PrintFunction): Doc {
    return [
      'do',
      this.body.variant.kind === NonterminalKind.Block
        ? [' ', path.call(print, 'body'), ' ']
        : group([indent([line, path.call(print, 'body')]), line]),
      'while (',
      printSeparatedItem(path.call(print, 'condition')),
      ');'
    ];
  }
}
