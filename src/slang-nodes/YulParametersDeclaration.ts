import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulParameters } from './YulParameters.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { SlangNode } from '../types.js';

export class YulParametersDeclaration implements SlangNode {
  readonly kind = NonterminalKind.YulParametersDeclaration;

  comments;

  loc;

  openParen: string;

  parameters: YulParameters;

  closeParen: string;

  constructor(ast: ast.YulParametersDeclaration, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openParen = ast.openParen.text;
    this.parameters = new YulParameters(ast.parameters, offsets[0]);
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
