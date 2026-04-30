import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printGroupAndIndentIfBreakPair } from '../slang-printers/print-group-and-indent-if-break-pair.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StateVariableAttributes } from './StateVariableAttributes.js';
import { TerminalNode } from './TerminalNode.js';
import { StateVariableDefinitionValue } from './StateVariableDefinitionValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { indent } = doc.builders;

export class StateVariableDefinition extends SlangNode {
  readonly kind = NonterminalKind.StateVariableDefinition;

  typeName: TypeName['variant'];

  attributes: StateVariableAttributes;

  name: TerminalNode;

  value?: StateVariableDefinitionValue;

  constructor(ast: ast.StateVariableDefinition, collected: CollectedMetadata) {
    super(ast, collected);

    this.typeName = extractVariant(new TypeName(ast.typeName, collected));
    this.attributes = new StateVariableAttributes(ast.attributes, collected);
    this.name = new TerminalNode(ast.name, collected);
    if (ast.value) {
      this.value = new StateVariableDefinitionValue(ast.value, collected);
    }

    this.updateMetadata(this.typeName, this.attributes, this.value);
  }

  print(print: PrintFunction): Doc {
    return printGroupAndIndentIfBreakPair(
      [print('typeName'), indent(print('attributes')), ' ', print('name')],
      [print('value'), ';']
    );
  }
}
