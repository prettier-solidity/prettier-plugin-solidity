import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { NamedArgumentGroup } from './NamedArgumentGroup.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class NamedArgumentsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.NamedArgumentsDeclaration;

  arguments?: NamedArgumentGroup;

  constructor(
    ast: ast.NamedArgumentsDeclaration,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (ast.arguments) {
      this.arguments = new NamedArgumentGroup(
        ast.arguments,
        collected,
        options
      );
    }

    this.updateMetadata(this.arguments);
  }

  print(path: AstPath<NamedArgumentsDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'arguments'), ')'];
  }
}
