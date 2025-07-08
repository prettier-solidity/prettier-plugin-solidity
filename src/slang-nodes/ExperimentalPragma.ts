import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ExperimentalFeature } from './ExperimentalFeature.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ExperimentalPragma extends SlangNode {
  readonly kind = NonterminalKind.ExperimentalPragma;

  feature: ExperimentalFeature;

  constructor(ast: ast.ExperimentalPragma, options: ParserOptions<AstNode>) {
    super(ast);

    this.feature = new ExperimentalFeature(ast.feature, options);

    this.updateMetadata(this.feature);
  }

  print(path: AstPath<ExperimentalPragma>, print: PrintFunction): Doc {
    return ['experimental ', path.call(print, 'feature')];
  }
}
