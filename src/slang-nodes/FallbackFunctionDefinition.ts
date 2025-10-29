import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunctionWithBody } from '../slang-printers/print-function.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FallbackFunctionAttributes } from './FallbackFunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class FallbackFunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.FallbackFunctionDefinition;

  parameters: ParametersDeclaration;

  attributes: FallbackFunctionAttributes;

  returns?: ReturnsDeclaration;

  body: FunctionBody['variant'];

  constructor(
    ast: ast.FallbackFunctionDefinition,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.parameters = new ParametersDeclaration(ast.parameters, options);
    this.attributes = new FallbackFunctionAttributes(ast.attributes, options);
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, options);
    }
    this.body = extractVariant(new FunctionBody(ast.body, options));

    this.updateMetadata(
      this.parameters,
      this.attributes,
      this.returns,
      this.body
    );

    this.cleanModifierInvocationArguments();
  }

  cleanModifierInvocationArguments(): void {
    for (const attribute of this.attributes.items) {
      if (
        typeof attribute !== 'string' &&
        attribute.kind === NonterminalKind.ModifierInvocation
      ) {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(path: AstPath<FallbackFunctionDefinition>, print: PrintFunction): Doc {
    return printFunctionWithBody('fallback', this, path, print);
  }
}
