import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

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
    return [
      printVariant('leftOperand', path, print),
      ` ${this.operator}`,
      printIndentedGroupOrSpacedDocument(
        printVariant('rightOperand', path, print),
        !(rightOperandVariant instanceof TerminalNode) &&
          isBinaryOperation(rightOperandVariant)
      )
    ];
  }
}
