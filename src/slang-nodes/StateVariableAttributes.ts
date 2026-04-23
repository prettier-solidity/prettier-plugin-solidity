import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { AttributesCollection } from './AttributesCollection.js';
import { StateVariableAttribute } from './StateVariableAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class StateVariableAttributes extends AttributesCollection<
  ast.StateVariableAttributes,
  StateVariableAttribute
> {
  readonly kind = NonterminalKind.StateVariableAttributes;

  constructor(ast: ast.StateVariableAttributes, collected: CollectedMetadata) {
    super(ast, collected, StateVariableAttribute);
  }
}
