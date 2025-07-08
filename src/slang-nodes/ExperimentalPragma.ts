import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ExperimentalFeature } from './ExperimentalFeature.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ExperimentalPragma implements SlangNode {
  readonly kind = NonterminalKind.ExperimentalPragma;

  comments;

  loc;

  feature: ExperimentalFeature;

  constructor(ast: ast.ExperimentalPragma, options: ParserOptions<AstNode>) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.feature = new ExperimentalFeature(ast.feature, options);

    updateMetadata(this.loc, this.comments, [this.feature]);
  }

  print(path: AstPath<ExperimentalPragma>, print: PrintFunction): Doc {
    return ['experimental ', path.call(print, 'feature')];
  }
}
