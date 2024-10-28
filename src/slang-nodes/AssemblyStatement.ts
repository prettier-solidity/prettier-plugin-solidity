import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { StringLiteral } from './StringLiteral.js';
import { AssemblyFlagsDeclaration } from './AssemblyFlagsDeclaration.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class AssemblyStatement implements SlangNode {
  readonly kind = NonterminalKind.AssemblyStatement;

  comments;

  loc;

  label?: StringLiteral;

  flags?: AssemblyFlagsDeclaration;

  body: YulBlock;

  constructor(ast: ast.AssemblyStatement, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    if (ast.label) {
      this.label = new StringLiteral(ast.label, options);
    }
    if (ast.flags) {
      this.flags = new AssemblyFlagsDeclaration(ast.flags, options);
    }
    this.body = new YulBlock(ast.body, options);

    metadata = updateMetadata(metadata, [this.label, this.flags, this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<AssemblyStatement>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      'assembly',
      path.call(print, 'label'),
      path.call(print, 'flags'),
      path.call(print, 'body')
    ]);
  }
}
