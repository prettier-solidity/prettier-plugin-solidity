import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isLabel } from '../slang-utils/is-label.js';
import { printGroupAndIndentIfBreakPair } from '../slang-printers/print-group-and-indent-if-break-pair.js';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { label } = doc.builders;

export class FunctionCallExpression extends SlangNode {
  readonly kind = NonterminalKind.FunctionCallExpression;

  operand: Expression;

  arguments: ArgumentsDeclaration;

  constructor(
    ast: ast.FunctionCallExpression,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.operand = new Expression(ast.operand, options);
    this.arguments = new ArgumentsDeclaration(ast.arguments, options);

    this.updateMetadata(this.operand, this.arguments);
  }

  print(path: AstPath<FunctionCallExpression>, print: PrintFunction): Doc {
    const operand = printVariant('operand', path, print);
    const argumentsDoc = printVariant('arguments', path, print);

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(operand) && operand.label === 'MemberAccessChain') {
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label(
        'MemberAccessChain',
        printGroupAndIndentIfBreakPair(operand.contents, argumentsDoc)
      );
    }

    return [operand, argumentsDoc].flat();
  }
}
