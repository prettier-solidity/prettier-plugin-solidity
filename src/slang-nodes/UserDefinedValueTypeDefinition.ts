import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ElementaryType } from './ElementaryType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
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

  print(
    path: AstPath<UserDefinedValueTypeDefinition>,
    print: PrintFunction
  ): Doc {
    return [
      'type ',
      path.call(print, 'name'),
      ' is ',
      path.call(print, 'valueType'),
      ';'
    ];
  }
}
