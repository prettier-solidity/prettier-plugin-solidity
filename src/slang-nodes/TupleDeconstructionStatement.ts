import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printGroupAndIndentIfBreakPair } from '../slang-printers/print-group-and-indent-if-break-pair.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { TupleDeconstructionElements } from './TupleDeconstructionElements.ts';
import { Expression } from './Expression.ts';

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
