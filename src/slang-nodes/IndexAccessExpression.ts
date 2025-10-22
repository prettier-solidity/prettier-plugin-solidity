import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printGroupAndIndentIfBreakPair } from '../slang-printers/print-group-and-indent-if-break-pair.js';
import { isLabel } from '../slang-utils/is-label.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { IndexAccessEnd } from './IndexAccessEnd.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { label } = doc.builders;

export class IndexAccessExpression extends SlangNode {
  readonly kind = NonterminalKind.IndexAccessExpression;

  operand: Expression['variant'];

  start?: Expression['variant'];

  end?: IndexAccessEnd;

  constructor(ast: ast.IndexAccessExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.operand = extractVariant(new Expression(ast.operand, options));
    if (ast.start) {
      this.start = extractVariant(new Expression(ast.start, options));
    }
    if (ast.end) {
      this.end = new IndexAccessEnd(ast.end, options);
    }

    this.updateMetadata(this.operand, this.start, this.end);
  }

  print(path: AstPath<IndexAccessExpression>, print: PrintFunction): Doc {
    const operand = path.call(print, 'operand');
    const indexDoc = [
      '[',
      printSeparatedItem([path.call(print, 'start'), path.call(print, 'end')]),
      ']'
    ];

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(operand) && operand.label === 'MemberAccessChain') {
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label(
        'MemberAccessChain',
        printGroupAndIndentIfBreakPair(operand.contents, indexDoc)
      );
    }

    return [operand, indexDoc].flat();
  }
}
