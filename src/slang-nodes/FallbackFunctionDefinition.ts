import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunctionWithBody } from '../slang-printers/print-function.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FallbackFunctionAttributes } from './FallbackFunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class FallbackFunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.FallbackFunctionDefinition;

  parameters: ParametersDeclaration;

  attributes: FallbackFunctionAttributes;

  returns?: ReturnsDeclaration;

  body: FunctionBody['variant'];

  constructor(
    ast: ast.FallbackFunctionDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.parameters = new ParametersDeclaration(
      ast.parameters,
      collected,
      options
    );
    this.attributes = new FallbackFunctionAttributes(
      ast.attributes,
      collected,
      options
    );
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, collected, options);
    }
    this.body = extractVariant(new FunctionBody(ast.body, collected, options));

    this.updateMetadata(
      this.parameters,
      this.attributes,
      this.returns,
      this.body
    );

    for (const attribute of this.attributes.items) {
      if (attribute.kind === NonterminalKind.ModifierInvocation) {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(print: PrintFunction): Doc {
    return printFunctionWithBody('fallback', this, print);
  }
}
