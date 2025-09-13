import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { SlangNode } from './SlangNode.js';
import { YulVariableDeclarationValue } from './YulVariableDeclarationValue.js';
import { YulVariableNames } from './YulVariableNames.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulVariableDeclarationStatement extends SlangNode {
  readonly kind = NonterminalKind.YulVariableDeclarationStatement;

  variables: YulVariableNames;

  value?: YulVariableDeclarationValue;

  constructor(
    ast: ast.YulVariableDeclarationStatement,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.variables = new YulVariableNames(ast.variables);
    if (ast.value) {
      this.value = new YulVariableDeclarationValue(ast.value, options);
    }

    this.updateMetadata(this.value);
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
