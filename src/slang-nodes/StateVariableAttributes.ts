import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { StateVariableAttribute } from './StateVariableAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class StateVariableAttributes extends SlangNode {
  readonly kind = NonterminalKind.StateVariableAttributes;

  items: StateVariableAttribute['variant'][];

  constructor(ast: ast.StateVariableAttributes) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new StateVariableAttribute(item))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<StateVariableAttributes>, print: PrintFunction): Doc {
    return path.map((item) => [line, print(item)], 'items');
  }
}
