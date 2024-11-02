import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ConstructorAttributes } from './ConstructorAttributes.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ConstructorDefinition implements SlangNode {
  readonly kind = NonterminalKind.ConstructorDefinition;

  comments;

  loc;

  parameters: ParametersDeclaration;

  attributes: ConstructorAttributes;

  body: Block;

  constructor(
    ast: ast.ConstructorDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.parameters = new ParametersDeclaration(
      ast.parameters,
      offsets[0],
      options
    );
    this.attributes = new ConstructorAttributes(
      ast.attributes,
      offsets[1],
      options
    );
    this.body = new Block(ast.body, offsets[2], options);

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
