import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunctionWithBody } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ConstructorAttributes } from './ConstructorAttributes.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ConstructorDefinition extends SlangNode {
  readonly kind = NonterminalKind.ConstructorDefinition;

  parameters: ParametersDeclaration;

  attributes: ConstructorAttributes;

  body: Block;

  constructor(
    ast: ast.ConstructorDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.parameters = new ParametersDeclaration(
      ast.parameters,
      collected,
      options
    );
    this.attributes = new ConstructorAttributes(
      ast.attributes,
      collected,
      options
    );
    this.body = new Block(ast.body, collected, options);

    this.updateMetadata(this.parameters, this.attributes, this.body);
  }

  print(path: AstPath<ConstructorDefinition>, print: PrintFunction): Doc {
    return printFunctionWithBody('constructor', this, path, print);
  }
}
