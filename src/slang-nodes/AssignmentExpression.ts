import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class AssignmentExpression extends SlangNode {
  readonly kind = NonterminalKind.AssignmentExpression;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  constructor(ast: ast.AssignmentExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.leftOperand = extractVariant<typeof Expression>(
      Expression,
      ast.leftOperand,
      options
    );
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant<typeof Expression>(
      Expression,
      ast.rightOperand,
      options
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);
  }

  print(path: AstPath<AssignmentExpression>, print: PrintFunction): Doc {
    const rightOperandVariant = this.rightOperand;
    const rightOperand = path.call(print, 'rightOperand');
    return [
      path.call(print, 'leftOperand'),
      ` ${this.operator}`,
      !(rightOperandVariant instanceof TerminalNode) &&
      isBinaryOperation(rightOperandVariant)
        ? group(indent([line, rightOperand]))
        : [' ', rightOperand]
    ];
  }
}
