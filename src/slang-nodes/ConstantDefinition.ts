import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { printAssignmentRightSide } from '../slang-printers/print-assignment-right-side.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { TerminalNode } from './TerminalNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class ConstantDefinition extends SlangNode {
  readonly kind = NonterminalKind.ConstantDefinition;

  typeName: TypeName['variant'];

  name: TerminalNode;

  value: Expression['variant'];

  constructor(
    ast: ast.ConstantDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.typeName = extractVariant(
      new TypeName(ast.typeName, collected, options)
    );
    this.name = new TerminalNode(ast.name, collected);
    this.value = extractVariant(new Expression(ast.value, collected, options));

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
