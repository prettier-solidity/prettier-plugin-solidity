import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class InheritanceType implements SlangNode {
  readonly kind = NonterminalKind.InheritanceType;

  comments;

  loc;

  typeName: IdentifierPath;

  arguments?: ArgumentsDeclaration;

  constructor(ast: ast.InheritanceType, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.typeName = new IdentifierPath(ast.typeName);
    if (ast.arguments) {
      this.arguments = new ArgumentsDeclaration(ast.arguments, options);
    }

    metadata = updateMetadata(metadata, [this.typeName, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<InheritanceType>, print: PrintFunction): Doc {
    return [path.call(print, 'typeName'), path.call(print, 'arguments')];
  }
}
