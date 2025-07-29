import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ForStatementInitialization } from './ForStatementInitialization.js';
import { ForStatementCondition } from './ForStatementCondition.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class ForStatement extends SlangNode {
  readonly kind = NonterminalKind.ForStatement;

  initialization: ForStatementInitialization['variant'];

  condition: ForStatementCondition['variant'];

  iterator?: Expression['variant'];

  body: Statement['variant'];

  constructor(ast: ast.ForStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.initialization = extractVariant<typeof ForStatementInitialization>(
      ForStatementInitialization,
      ast.initialization,
      options
    );
    this.condition = extractVariant<typeof ForStatementCondition>(
      ForStatementCondition,
      ast.condition,
      options
    );
    if (ast.iterator) {
      this.iterator = extractVariant<typeof Expression>(
        Expression,
        ast.iterator,
        options
      );
    }
    this.body = extractVariant<typeof Statement>(Statement, ast.body, options);

    this.updateMetadata(
      this.initialization,
      this.condition,
      this.iterator,
      this.body
    );
  }

  print(path: AstPath<ForStatement>, print: PrintFunction): Doc {
    const initialization = path.call(print, 'initialization');
    const condition = path.call(print, 'condition');
    const iterator = path.call(print, 'iterator');
    const body = path.call(print, 'body');

    return [
      'for (',
      printSeparatedList([initialization, condition, iterator], {
        separator:
          initialization !== ';' || condition !== ';' || iterator !== ''
            ? line
            : ''
      }),
      ')',
      this.body.kind === NonterminalKind.Block
        ? [' ', body]
        : group(indent([line, body]))
    ];
  }
}
