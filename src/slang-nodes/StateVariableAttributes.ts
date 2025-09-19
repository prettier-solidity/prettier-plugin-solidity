import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { StateVariableAttribute } from './StateVariableAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class StateVariableAttributes extends SlangNode {
  readonly kind = NonterminalKind.StateVariableAttributes;

  items: StateVariableAttribute[];

  constructor(ast: ast.StateVariableAttributes) {
    super(ast, true);

    this.items = ast.items.map((item) => new StateVariableAttribute(item));

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<StateVariableAttributes>, print: PrintFunction): Doc {
    return this.items.length
      ? path.map(printVariant(print), 'items').map((item) => [line, item])
      : '';
  }
}
