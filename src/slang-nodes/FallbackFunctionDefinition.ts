import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FallbackFunctionAttributes } from './FallbackFunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

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
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.parameters = new ParametersDeclaration(ast.parameters, options);
    this.attributes = new FallbackFunctionAttributes(ast.attributes, options);
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, options);
    }
    this.body = new FunctionBody(ast.body, options);

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
    for (const { variant: attribute } of this.attributes.items) {
      if (
        typeof attribute !== 'string' &&
        attribute.kind === NonterminalKind.ModifierInvocation
      ) {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(path: AstPath<FallbackFunctionDefinition>, print: PrintFunction): Doc {
    return printFunction('fallback', this, path, print);
  }
}
