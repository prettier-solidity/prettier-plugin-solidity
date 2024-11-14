import { NonterminalKind, TerminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class AssignmentExpression implements SlangNode {
  readonly kind = NonterminalKind.AssignmentExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(ast: ast.AssignmentExpression, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.leftOperand = new Expression(ast.leftOperand, options);
    this.operator = ast.operator.unparse();
    this.rightOperand = new Expression(ast.rightOperand, options);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<AssignmentExpression>, print: PrintFunction): Doc {
    return [
      path.call(print, 'leftOperand'),
      ` ${this.operator}`,
      this.rightOperand.variant.kind !== TerminalKind.Identifier &&
      isBinaryOperation(this.rightOperand.variant)
        ? group(indent([line, path.call(print, 'rightOperand')]))
        : [' ', path.call(print, 'rightOperand')]
    ];
  }
}
