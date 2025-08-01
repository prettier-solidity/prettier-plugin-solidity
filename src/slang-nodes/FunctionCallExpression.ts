import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { isLabel } from '../slang-utils/is-label.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indentIfBreak, label } = doc.builders;

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
    const operand = path.call(print, 'operand');
    const argumentsDoc = path.call(print, 'arguments');

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(operand) && operand.label === 'MemberAccessChain') {
      const groupId = Symbol('Slang.FunctionCallExpression.operand');
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [
        group(operand.contents, { id: groupId }),
        indentIfBreak(argumentsDoc, { groupId })
      ]);
    }

    return [operand, argumentsDoc].flat();
  }
}
