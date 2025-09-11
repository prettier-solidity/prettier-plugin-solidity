import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { NamedArgumentGroup } from './NamedArgumentGroup.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class NamedArgumentsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.NamedArgumentsDeclaration;

  arguments?: NamedArgumentGroup;

  constructor(
    ast: ast.NamedArgumentsDeclaration,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    if (ast.arguments) {
      this.arguments = new NamedArgumentGroup(ast.arguments, options);
    }

    this.updateMetadata(this.arguments);
  }

  print(path: AstPath<NamedArgumentsDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'arguments'), ')'];
  }
}
