import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { VersionLiteral } from './VersionLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class VersionRange extends SlangNode {
  readonly kind = NonterminalKind.VersionRange;

  start: VersionLiteral;

  end: VersionLiteral;

  constructor(ast: ast.VersionRange) {
    super(ast);

    this.start = new VersionLiteral(ast.start);
    this.end = new VersionLiteral(ast.end);

    this.updateMetadata(this.start, this.end);
  }

  print(path: AstPath<VersionRange>, print: PrintFunction): Doc {
    return [
      path.call(printVariant(print), 'start'),
      ' - ',
      path.call(printVariant(print), 'end')
    ];
  }
}
