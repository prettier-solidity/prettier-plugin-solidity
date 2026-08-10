import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.js';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { StateVariableAttribute } from './StateVariableAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class StateVariableAttributes extends SlangNode {
  readonly kind = NonterminalKind.StateVariableAttributes;

  items: StateVariableAttribute['variant'][];

  constructor(ast: ast.StateVariableAttributes, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new StateVariableAttribute(item, collected))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<StateVariableAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
