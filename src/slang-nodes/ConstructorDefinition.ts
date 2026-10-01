import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.ts';
import { SlangNode } from './SlangNode.ts';
import { ParametersDeclaration } from './ParametersDeclaration.ts';
import { ConstructorAttributes } from './ConstructorAttributes.ts';
import { Block } from './Block.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ConstructorDefinition extends SlangNode {
  readonly kind = NonterminalKind.ConstructorDefinition;

  parameters: ParametersDeclaration;

  attributes: ConstructorAttributes;

  body: Block;

  constructor(ast: ast.ConstructorDefinition, collected: CollectedMetadata) {
    super(ast, collected);

    this.parameters = new ParametersDeclaration(ast.parameters, collected);
    this.attributes = new ConstructorAttributes(ast.attributes, collected);
    this.body = new Block(ast.body, collected);

    this.updateMetadata(this.parameters, this.attributes, this.body);
  }

  print(print: PrintFunction): Doc {
    return printFunction('constructor', this, print);
  }
}
