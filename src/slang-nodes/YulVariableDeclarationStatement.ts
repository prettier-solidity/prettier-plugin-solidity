import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulVariableDeclarationValue } from './YulVariableDeclarationValue.js';
import { YulVariableNames } from './YulVariableNames.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class YulVariableDeclarationStatement implements SlangNode {
  readonly kind = NonterminalKind.YulVariableDeclarationStatement;

  comments;

  loc;

  variables: YulVariableNames;

  value?: YulVariableDeclarationValue;

  constructor(
    ast: ast.YulVariableDeclarationStatement,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.variables = new YulVariableNames(ast.variables);
    if (ast.value) {
      this.value = new YulVariableDeclarationValue(ast.value, options);
    }

    metadata = updateMetadata(metadata, [this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<YulVariableDeclarationStatement>,
    print: PrintFunction
  ): Doc {
    return [
      'let',
      path.call(print, 'variables'),
      ' ',
      path.call(print, 'value')
    ];
  }
}
