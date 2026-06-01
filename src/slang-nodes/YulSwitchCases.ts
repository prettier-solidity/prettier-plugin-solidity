import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { VariantCollection } from './VariantCollection.js';
import { YulSwitchCase } from './YulSwitchCase.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { hardline, join } = doc.builders;

export class YulSwitchCases extends VariantCollection<
  ast.YulSwitchCases,
  YulSwitchCase
> {
  readonly kind = NonterminalKind.YulSwitchCases;

  constructor(ast: ast.YulSwitchCases, collected: CollectedMetadata) {
    super(ast, collected, YulSwitchCase);
  }

  print(print: PrintFunction, path: AstPath<YulSwitchCases>): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
