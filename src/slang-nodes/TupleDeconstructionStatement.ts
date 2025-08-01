import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TupleDeconstructionElements } from './TupleDeconstructionElements.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indentIfBreak } = doc.builders;

export class TupleDeconstructionStatement extends SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionStatement;

  varKeyword?: string;

  elements: TupleDeconstructionElements;

  expression: Expression;

  constructor(
    ast: ast.TupleDeconstructionStatement,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.varKeyword = ast.varKeyword?.unparse();
    this.elements = new TupleDeconstructionElements(ast.elements, options);
    this.expression = new Expression(ast.expression, options);

    this.updateMetadata(this.elements, this.expression);
  }

  print(
    path: AstPath<TupleDeconstructionStatement>,
    print: PrintFunction
  ): Doc {
    const groupId = Symbol('Slang.VariableDeclarationStatement.variables');
    return [
      group(
        [this.varKeyword ? 'var (' : '(', path.call(print, 'elements'), ')'],
        { id: groupId }
      ),
      indentIfBreak([' = ', path.call(print, 'expression'), ';'], { groupId })
    ];
  }
}
