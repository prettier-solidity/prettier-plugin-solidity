import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FallbackFunctionAttributes } from './FallbackFunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class FallbackFunctionDefinition implements SlangNode {
  readonly kind = NonterminalKind.FallbackFunctionDefinition;

  comments;

  loc;

  parameters: ParametersDeclaration;

  attributes: FallbackFunctionAttributes;

  returns?: ReturnsDeclaration;

  body: FunctionBody;

  constructor(
    ast: ast.FallbackFunctionDefinition,
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
    this.attributes = new FallbackFunctionAttributes(
      ast.attributes,
      offsets[1],
      options
    );
    let i = 2;
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, offsets[i], options);
      i += 1;
    }
    this.body = new FunctionBody(ast.body, offsets[i], options);

    metadata = updateMetadata(metadata, [
      this.parameters,
      this.attributes,
      this.returns,
      this.body
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.cleanModifierInvocationArguments();
  }

  cleanModifierInvocationArguments(): void {
    for (const attribute of this.attributes.items) {
      if (
        typeof attribute.variant !== 'string' &&
        attribute.variant.kind === NonterminalKind.ModifierInvocation
      ) {
        attribute.variant.cleanModifierInvocationArguments();
      }
    }
  }

  print(path: AstPath<FallbackFunctionDefinition>, print: PrintFunction): Doc {
    return printFunction('fallback', this, path, print);
  }
}
