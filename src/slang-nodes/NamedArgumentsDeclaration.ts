import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { NamedArgumentGroup } from './NamedArgumentGroup.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class NamedArgumentsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.NamedArgumentsDeclaration;

  comments;

  loc;

  arguments?: NamedArgumentGroup;

  constructor(
    ast: ast.NamedArgumentsDeclaration,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    if (ast.arguments) {
      this.arguments = new NamedArgumentGroup(ast.arguments, options);
    }

    metadata = updateMetadata(metadata, [this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<NamedArgumentsDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'arguments'), ')'];
  }
}
