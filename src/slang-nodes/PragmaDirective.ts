import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Pragma } from './Pragma.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class PragmaDirective extends SlangNode {
  readonly kind = NonterminalKind.PragmaDirective;

  pragma: Pragma['variant'];

  constructor(ast: ast.PragmaDirective, collected: CollectedMetadata) {
    super(ast, collected);

    this.pragma = extractVariant(new Pragma(ast.pragma, collected));

    this.updateMetadata(this.pragma);
  }

  print(print: PrintFunction): Doc {
    return ['pragma ', print('pragma'), ';'];
  }
}
