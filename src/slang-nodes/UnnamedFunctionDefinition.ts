import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { ParametersDeclaration } from './ParametersDeclaration.ts';
import { UnnamedFunctionAttributes } from './UnnamedFunctionAttributes.ts';
import { FunctionBody } from './FunctionBody.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class UnnamedFunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionDefinition;

  parameters: ParametersDeclaration;

  attributes: UnnamedFunctionAttributes;

  body: FunctionBody['variant'];

  constructor(
    ast: ast.UnnamedFunctionDefinition,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.parameters = new ParametersDeclaration(ast.parameters, collected);
    this.attributes = new UnnamedFunctionAttributes(ast.attributes, collected);
    this.body = extractVariant(new FunctionBody(ast.body, collected));

    this.updateMetadata(this.parameters, this.attributes, this.body);

    for (const attribute of this.attributes.items) {
      if (attribute.kind === NonterminalKind.ModifierInvocation) {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(print: PrintFunction): Doc {
    return printFunction('function', this, print);
  }
}
