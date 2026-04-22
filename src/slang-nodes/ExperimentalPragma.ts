import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ExperimentalFeature } from './ExperimentalFeature.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ExperimentalPragma extends SlangNode {
  readonly kind = NonterminalKind.ExperimentalPragma;

  feature: ExperimentalFeature['variant'];

  constructor(ast: ast.ExperimentalPragma, collected: CollectedMetadata) {
    super(ast, collected);

    this.feature = extractVariant(
      new ExperimentalFeature(ast.feature, collected)
    );

    this.updateMetadata(this.feature);
  }

  print(print: PrintFunction): Doc {
    return ['experimental ', print('feature')];
  }
}
