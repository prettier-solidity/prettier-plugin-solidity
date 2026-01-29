import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunctionWithBody } from '../slang-printers/print-function.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { UnnamedFunctionAttributes } from './UnnamedFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class UnnamedFunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionDefinition;

  parameters: ParametersDeclaration;

  attributes: UnnamedFunctionAttributes;

  body: FunctionBody['variant'];

  constructor(
    ast: ast.UnnamedFunctionDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.parameters = new ParametersDeclaration(
      ast.parameters,
      collected,
      options
    );
    this.attributes = new UnnamedFunctionAttributes(
      ast.attributes,
      collected,
      options
    );
    this.body = extractVariant(new FunctionBody(ast.body, collected, options));

    this.updateMetadata(this.parameters, this.attributes, this.body);

    this.cleanModifierInvocationArguments();
  }

  cleanModifierInvocationArguments(): void {
    for (const attribute of this.attributes.items) {
      if (attribute.kind === NonterminalKind.ModifierInvocation) {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(path: AstPath<UnnamedFunctionDefinition>, print: PrintFunction): Doc {
    return printFunctionWithBody('function', this, path, print);
  }
}
