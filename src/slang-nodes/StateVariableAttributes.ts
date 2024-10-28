import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { StateVariableAttribute } from './StateVariableAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { line } = doc.builders;

export class StateVariableAttributes implements SlangNode {
  readonly kind = NonterminalKind.StateVariableAttributes;

  comments;

  loc;

  items: StateVariableAttribute[];

  constructor(ast: ast.StateVariableAttributes) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new StateVariableAttribute(item));

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<StateVariableAttributes>, print: PrintFunction): Doc {
    return this.items.length
      ? path.map(print, 'items').map((item) => [line, item])
      : '';
  }
}
