import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { InheritanceType } from './InheritanceType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class InheritanceTypes extends SlangNode {
  readonly kind = NonterminalKind.InheritanceTypes;

  items: InheritanceType[];

  constructor(ast: ast.InheritanceTypes, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new InheritanceType(item, options));
  }

  print(path: AstPath<InheritanceTypes>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: line
    });
  }
}
