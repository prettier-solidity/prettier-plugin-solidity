import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printGroupAndIndentIfBreakPair } from '../slang-printers/print-group-and-indent-if-break-pair.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TupleDeconstructionElements } from './TupleDeconstructionElements.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class TupleDeconstructionStatement extends SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionStatement;

  varKeyword?: string;

  elements: TupleDeconstructionElements;

  expression: Expression['variant'];

  constructor(
    ast: ast.TupleDeconstructionStatement,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.varKeyword = ast.varKeyword?.unparse();
    this.elements = new TupleDeconstructionElements(ast.elements, options);
    this.expression = extractVariant(new Expression(ast.expression, options));

    this.updateMetadata(this.elements, this.expression);
  }

  print(
    path: AstPath<TupleDeconstructionStatement>,
    print: PrintFunction
  ): Doc {
    return printGroupAndIndentIfBreakPair(
      [this.varKeyword ? 'var (' : '(', path.call(print, 'elements'), ') = '],
      [path.call(print, 'expression'), ';']
    );
  }
}
