import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { indent } from '../slang-printers/prettier-builders.ts';
import { printGroupAndIndentIfBreakPair } from '../slang-printers/print-group-and-indent-if-break-pair.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { TypeName } from './TypeName.ts';
import { StateVariableAttributes } from './StateVariableAttributes.ts';
import { TerminalNode } from './TerminalNode.ts';
import { StateVariableDefinitionValue } from './StateVariableDefinitionValue.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

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
