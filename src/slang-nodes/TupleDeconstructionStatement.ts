import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printGroupAndIndentIfBreakPair } from '../slang-printers/print-group-and-indent-if-break-pair.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TupleDeconstructionElements } from './TupleDeconstructionElements.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class TupleDeconstructionStatement extends SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionStatement;

  varKeyword?: string;

  elements: TupleDeconstructionElements;

  expression: Expression['variant'];

  constructor(
    ast: ast.TupleDeconstructionStatement,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.varKeyword = ast.varKeyword?.unparse();
    this.elements = new TupleDeconstructionElements(ast.elements, collected);
    this.expression = extractVariant(new Expression(ast.expression, collected));

    this.updateMetadata(this.elements, this.expression);
  }

  print(print: PrintFunction): Doc {
    return printGroupAndIndentIfBreakPair(
      [this.varKeyword ? 'var (' : '(', print('elements'), ') = '],
      [print('expression'), ';']
    );
  }
}
