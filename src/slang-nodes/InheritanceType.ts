import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class InheritanceType implements SlangNode {
  readonly kind = NonterminalKind.InheritanceType;

  comments;

  loc;

  typeName: IdentifierPath;

  arguments?: ArgumentsDeclaration;

  constructor(
    ast: ast.InheritanceType,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new IdentifierPath(ast.typeName, offsets[0]);
    if (ast.arguments) {
      this.arguments = new ArgumentsDeclaration(
        ast.arguments,
        offsets[1],
        options
      );
    }

    metadata = updateMetadata(metadata, [this.typeName, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<InheritanceType>, print: PrintFunction): Doc {
    return [
      path.call(print, 'typeName'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
