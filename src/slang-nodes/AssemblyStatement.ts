import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { AssemblyFlagsDeclaration } from './AssemblyFlagsDeclaration.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class AssemblyStatement extends SlangNode {
  readonly kind = NonterminalKind.AssemblyStatement;

  label?: StringLiteral;

  flags?: AssemblyFlagsDeclaration;

  body: YulBlock;

  constructor(ast: ast.AssemblyStatement, collected: CollectedMetadata) {
    super(ast, collected);

    if (ast.label) {
      this.label = new StringLiteral(ast.label, collected);
    }
    if (ast.flags) {
      this.flags = new AssemblyFlagsDeclaration(ast.flags, collected);
    }
    this.body = new YulBlock(ast.body, collected);

    this.updateMetadata(this.label, this.flags, this.body);
  }

  print(print: PrintFunction): Doc {
    const labelDoc = print('label');
    const flagsDoc = print('flags');
    return [
      'assembly ',
      labelDoc ? [labelDoc, ' '] : labelDoc,
      flagsDoc ? [flagsDoc, ' '] : flagsDoc,
      print('body')
    ];
  }
}
