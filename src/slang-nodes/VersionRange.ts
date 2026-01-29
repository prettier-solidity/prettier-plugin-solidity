import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { VersionLiteral } from './VersionLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class VersionRange extends SlangNode {
  readonly kind = NonterminalKind.VersionRange;

  start: VersionLiteral['variant'];

  end: VersionLiteral['variant'];

  constructor(ast: ast.VersionRange, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.start = extractVariant(new VersionLiteral(ast.start, options));
    this.end = extractVariant(new VersionLiteral(ast.end, options));

    this.updateMetadata(this.start, this.end);
  }

  print(path: AstPath<VersionRange>, print: PrintFunction): Doc {
    return [path.call(print, 'start'), ' - ', path.call(print, 'end')];
  }
}
