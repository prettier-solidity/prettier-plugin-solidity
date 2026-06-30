import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { VariantCollection } from './VariantCollection.js';
import { StateVariableAttribute } from './StateVariableAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class StateVariableAttributes extends VariantCollection<
  ast.StateVariableAttributes,
  StateVariableAttribute
> {
  readonly kind = NonterminalKind.StateVariableAttributes;

  constructor(ast: ast.StateVariableAttributes, collected: CollectedMetadata) {
    super(ast, collected, StateVariableAttribute);

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<StateVariableAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
