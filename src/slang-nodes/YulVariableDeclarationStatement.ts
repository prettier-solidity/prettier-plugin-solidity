import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulVariableDeclarationValue } from './YulVariableDeclarationValue.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class YulVariableDeclarationStatement implements SlangNode {
  readonly kind = NonterminalKind.YulVariableDeclarationStatement;

  comments;

  loc;

  letKeyword: string;

  names: string;

  value?: YulVariableDeclarationValue;

  constructor(
    ast: ast.YulVariableDeclarationStatement,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.letKeyword = ast.letKeyword.text;
    this.names = ast.names.text;
    if (ast.value) {
      this.value = new YulVariableDeclarationValue(
        ast.value,
        offsets[0],
        options
      );
    }

    metadata = updateMetadata(metadata, [this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      `${this.letKeyword} ${this.names} `,
      this.value ? path.call(print, 'value') : ''
    ];
  }
}
