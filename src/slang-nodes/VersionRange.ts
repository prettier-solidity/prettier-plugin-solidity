import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { VersionLiteral } from './VersionLiteral.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class VersionRange extends SlangNode {
  readonly kind = NonterminalKind.VersionRange;

  start: VersionLiteral['variant'];

  end: VersionLiteral['variant'];

  constructor(ast: ast.VersionRange, collected: CollectedMetadata) {
    super(ast, collected);

    this.start = extractVariant(new VersionLiteral(ast.start, collected));
    this.end = extractVariant(new VersionLiteral(ast.end, collected));

    this.updateMetadata(this.start, this.end);
  }

  print(print: PrintFunction): Doc {
    return [print('start'), ' - ', print('end')];
  }
}
