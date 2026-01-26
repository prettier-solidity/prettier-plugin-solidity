import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ElementaryType } from './ElementaryType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

export class UserDefinedValueTypeDefinition extends SlangNode {
  readonly kind = NonterminalKind.UserDefinedValueTypeDefinition;

  name: TerminalNode;

  valueType: ElementaryType['variant'];

  constructor(
    ast: ast.UserDefinedValueTypeDefinition,
    options: ParserOptions<AstNode>
  ) {
    super(ast, options);

    this.name = new TerminalNode(ast.name, options);
    this.valueType = extractVariant(new ElementaryType(ast.valueType, options));

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
