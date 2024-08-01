import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ExperimentalFeature } from './ExperimentalFeature.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class ExperimentalPragma implements SlangNode {
  readonly kind = NonterminalKind.ExperimentalPragma;

  comments;

  loc;

  experimentalKeyword: string;

  feature: ExperimentalFeature;

  constructor(
    ast: ast.ExperimentalPragma,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.experimentalKeyword = ast.experimentalKeyword.text;
    this.feature = new ExperimentalFeature(ast.feature, offsets[0], options);

    metadata = updateMetadata(metadata, [this.feature]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<ExperimentalPragma>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [`${this.experimentalKeyword} `, path.call(print, 'feature')];
  }
}
