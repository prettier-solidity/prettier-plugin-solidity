import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { AssemblyFlagsDeclaration } from './AssemblyFlagsDeclaration.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class AssemblyStatement extends SlangNode {
  readonly kind = NonterminalKind.AssemblyStatement;

  label?: StringLiteral;

  flags?: AssemblyFlagsDeclaration;

  body: YulBlock;

  constructor(ast: ast.AssemblyStatement, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.label) {
      this.label = new StringLiteral(ast.label, options);
    }
    if (ast.flags) {
      this.flags = new AssemblyFlagsDeclaration(ast.flags, options);
    }
    this.body = new YulBlock(ast.body, options);

    this.updateMetadata(this.label, this.flags, this.body);
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
