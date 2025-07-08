import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { YulVariableDeclarationValue } from './YulVariableDeclarationValue.js';
import { YulVariableNames } from './YulVariableNames.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

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
    const metadata = getNodeMetadata(ast);

    this.variables = new YulVariableNames(ast.variables);
    if (ast.value) {
      this.value = new YulVariableDeclarationValue(ast.value, options);
    }

    [this.loc, this.comments] = updateMetadata(metadata, [this.value]);
  }

  print(
    path: AstPath<YulVariableDeclarationStatement>,
    print: PrintFunction
  ): Doc {
    return joinExisting(' ', [
      ['let', path.call(print, 'variables')],
      path.call(print, 'value')
    ]);
  }
}
