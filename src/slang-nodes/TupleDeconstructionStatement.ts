import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleDeconstructionElements } from './TupleDeconstructionElements.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indentIfBreak } = doc.builders;

export class TupleDeconstructionStatement implements SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionStatement;

  comments;

  loc;

  varKeyword?: string;

  elements: TupleDeconstructionElements;

  expression: Expression;

  constructor(ast: ast.TupleDeconstructionStatement) {
    let metadata = getNodeMetadata(ast);

    this.varKeyword = ast.varKeyword?.unparse();
    this.elements = new TupleDeconstructionElements(ast.elements);
    this.expression = new Expression(ast.expression);

    metadata = updateMetadata(metadata, [this.elements, this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<TupleDeconstructionStatement>,
    print: PrintFunction
  ): Doc {
    const groupId = Symbol('Slang.VariableDeclarationStatement.variables');
    const declarationDoc = group(
      [this.varKeyword ? 'var (' : '(', path.call(print, 'elements'), ')'],
      { id: groupId }
    );

    return [
      declarationDoc,
      indentIfBreak([' = ', path.call(print, 'expression'), ';'], { groupId })
    ];
  }
}
