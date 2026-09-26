import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { TerminalNode } from './TerminalNode.ts';
import { ElementaryType } from './ElementaryType.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class UserDefinedValueTypeDefinition extends SlangNode {
  readonly kind = NonterminalKind.UserDefinedValueTypeDefinition;

  name: TerminalNode;

  valueType: ElementaryType['variant'];

  constructor(
    ast: ast.UserDefinedValueTypeDefinition,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    this.valueType = extractVariant(
      new ElementaryType(ast.valueType, collected)
    );

    this.updateMetadata(this.valueType);
  }

  print(print: PrintFunction): Doc {
    return ['type ', print('name'), ' is ', print('valueType'), ';'];
  }
}
