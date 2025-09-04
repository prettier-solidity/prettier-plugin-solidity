import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ElementaryType } from './ElementaryType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class UserDefinedValueTypeDefinition extends SlangNode {
  readonly kind = NonterminalKind.UserDefinedValueTypeDefinition;

  name: TerminalNode;

  valueType: ElementaryType;

  constructor(ast: ast.UserDefinedValueTypeDefinition) {
    super(ast);

    this.name = new TerminalNode(ast.name);
    this.valueType = new ElementaryType(ast.valueType);

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
      path.call(printVariant(print), 'valueType'),
      ';'
    ];
  }
}
