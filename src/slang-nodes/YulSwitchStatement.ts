import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulExpression } from './YulExpression.js';
import { YulSwitchCases } from './YulSwitchCases.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

const { hardline } = doc.builders;

export class YulSwitchStatement implements SlangNode {
  readonly kind = NonterminalKind.YulSwitchStatement;

  comments;

  loc;

  expression: YulExpression;

  cases: YulSwitchCases;

  constructor(
    ast: ast.YulSwitchStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.expression = new YulExpression(ast.expression, offsets[0], options);
    this.cases = new YulSwitchCases(ast.cases, offsets[1], options);

    metadata = updateMetadata(metadata, [this.expression, this.cases]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<YulSwitchStatement>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      'switch ',
      path.call(print, 'expression'),
      hardline,
      path.call(print, 'cases')
    ];
  }
}
