import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { AssemblyFlagsDeclaration } from './AssemblyFlagsDeclaration.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class AssemblyStatement extends SlangNode {
  readonly kind = NonterminalKind.AssemblyStatement;

  label?: StringLiteral;

  flags?: AssemblyFlagsDeclaration;

  body: YulBlock;

  constructor(
    ast: ast.AssemblyStatement,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    if (ast.label) {
      this.label = new StringLiteral(ast.label, collected, options);
    }
    if (ast.flags) {
      this.flags = new AssemblyFlagsDeclaration(ast.flags, collected, options);
    }
    this.body = new YulBlock(ast.body, collected, options);

    this.updateMetadata(this.label, this.flags, this.body);
  }

  print(print: PrintFunction): Doc {
    return [
      'assembly ',
      this.label ? [print('label'), ' '] : '',
      this.flags ? [print('flags'), ' '] : '',
      print('body')
    ];
  }
}
