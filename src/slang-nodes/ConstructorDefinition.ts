import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ConstructorAttributes } from './ConstructorAttributes.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ConstructorDefinition implements SlangNode {
  readonly kind = NonterminalKind.ConstructorDefinition;

  comments;

  loc;

  parameters: ParametersDeclaration;

  attributes: ConstructorAttributes;

  body: Block;

  constructor(ast: ast.ConstructorDefinition) {
    let metadata = getNodeMetadata(ast);

    this.parameters = new ParametersDeclaration(ast.parameters);
    this.attributes = new ConstructorAttributes(ast.attributes);
    this.body = new Block(ast.body);

    metadata = updateMetadata(metadata, [
      this.parameters,
      this.attributes,
      this.body
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ConstructorDefinition>, print: PrintFunction): Doc {
    return printFunction('constructor', this, path, print);
  }
}
