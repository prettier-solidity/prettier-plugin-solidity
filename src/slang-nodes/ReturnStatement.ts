import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { group, indent, line } = doc.builders;

function printExpression(
  node: ReturnStatement,
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions<AstNode>
): Doc {
  if (node.expression) {
    return typeof node.expression.variant !== 'string' &&
      (node.expression.variant.kind === NonterminalKind.TupleExpression ||
        (options.experimentalTernaries &&
          node.expression.variant.kind ===
            NonterminalKind.ConditionalExpression))
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
}

export class ReturnStatement implements SlangNode {
  readonly kind = NonterminalKind.ReturnStatement;

  comments;

  loc;

  returnKeyword: string;

  expression?: Expression;

  semicolon: string;

  constructor(
    ast: ast.ReturnStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.returnKeyword = ast.returnKeyword.text;
    if (ast.expression) {
      this.expression = new Expression(ast.expression, offsets[0], options);
    }
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions<AstNode>
  ): Doc {
    return [
      this.returnKeyword,
      printExpression(this, path, print, options),
      this.semicolon
    ];
  }
}
