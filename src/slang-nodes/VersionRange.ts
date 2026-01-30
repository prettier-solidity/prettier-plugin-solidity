import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { VersionLiteral } from './VersionLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
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

  print(path: AstPath<VersionRange>, print: PrintFunction): Doc {
    return [path.call(print, 'start'), ' - ', path.call(print, 'end')];
  }
}
