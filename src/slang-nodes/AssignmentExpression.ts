import { NonterminalKind, TerminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class AssignmentExpression extends SlangNode {
  readonly kind = NonterminalKind.AssignmentExpression;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(ast: ast.AssignmentExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.leftOperand = new Expression(ast.leftOperand, options);
    this.operator = ast.operator.unparse();
    this.rightOperand = new Expression(ast.rightOperand, options);

    this.updateMetadata(this.leftOperand, this.rightOperand);
  }

  print(path: AstPath<AssignmentExpression>, print: PrintFunction): Doc {
    const rightOperandVariant = this.rightOperand.variant;
    const rightOperand = path.call(print, 'rightOperand');
    return [
      path.call(print, 'leftOperand'),
      ` ${this.operator}`,
      rightOperandVariant.kind !== TerminalKind.Identifier &&
      isBinaryOperation(rightOperandVariant)
        ? group(indent([line, rightOperand]))
        : [' ', rightOperand]
    ];
  }
}
