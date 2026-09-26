import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { printAssignmentRightSide } from '../slang-printers/print-assignment-right-side.ts';
import { SlangNode } from './SlangNode.ts';
import { TypeName } from './TypeName.ts';
import { TerminalNode } from './TerminalNode.ts';
import { Expression } from './Expression.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ConstantDefinition extends SlangNode {
  readonly kind = NonterminalKind.ConstantDefinition;

  typeName: TypeName['variant'];

  name: TerminalNode;

  value: Expression['variant'];

  constructor(ast: ast.ConstantDefinition, collected: CollectedMetadata) {
    super(ast, collected);

    this.typeName = extractVariant(new TypeName(ast.typeName, collected));
    this.name = new TerminalNode(ast.name, collected);
    this.value = extractVariant(new Expression(ast.value, collected));

    this.updateMetadata(this.typeName, this.value);
  }

  print(print: PrintFunction): Doc {
    return [
      print('typeName'),
      ' constant ',
      print('name'),
      ' =',
      printAssignmentRightSide(print('value'), this.value),
      ';'
    ];
  }
}
