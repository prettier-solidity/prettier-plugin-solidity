const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent, line } = doc.builders;

function printExpression(
  node: ReturnStatement,
  path: AstPath<ReturnStatement>,
  print: PrintFunction,
  options: ParserOptions<AstNode>
): Doc {
  const expressionVariant = node.expression?.variant;
  if (expressionVariant) {
    return expressionVariant.kind === NonterminalKind.TupleExpression ||
      (options.experimentalTernaries &&
        expressionVariant.kind === NonterminalKind.ConditionalExpression)
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
}

export class ReturnStatement extends SlangNode {
  readonly kind = NonterminalKind.ReturnStatement;

  expression?: Expression;

  constructor(ast: ast.ReturnStatement, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.expression) {
      this.expression = new Expression(ast.expression, options);
    }

    this.updateMetadata(this.expression);
  }

  print(
    path: AstPath<ReturnStatement>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return ['return', printExpression(this, path, print, options), ';'];
  }
}
