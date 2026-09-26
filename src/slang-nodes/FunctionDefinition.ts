import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { satisfies } from 'semver';
import { printFunction } from '../slang-printers/print-function.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { FunctionName } from './FunctionName.ts';
import { ParametersDeclaration } from './ParametersDeclaration.ts';
import { FunctionAttributes } from './FunctionAttributes.ts';
import { ReturnsDeclaration } from './ReturnsDeclaration.ts';
import { FunctionBody } from './FunctionBody.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class FunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.FunctionDefinition;

  name: FunctionName['variant'];

  parameters: ParametersDeclaration;

  attributes: FunctionAttributes;

  returns?: ReturnsDeclaration;

  body: FunctionBody['variant'];

  constructor(ast: ast.FunctionDefinition, collected: CollectedMetadata) {
    super(ast, collected);

    this.name = extractVariant(new FunctionName(ast.name, collected));
    this.parameters = new ParametersDeclaration(ast.parameters, collected);
    this.attributes = new FunctionAttributes(ast.attributes, collected);
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, collected);
    }
    this.body = extractVariant(new FunctionBody(ast.body, collected));

    this.updateMetadata(
      this.name,
      this.parameters,
      this.attributes,
      this.returns,
      this.body
    );

    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    // So we delegate to the parents the responsibility of cleaning the
    // arguments of modifier invocations.
    if (satisfies(collected.options.compiler, '>=0.5.0')) {
      this.cleanModifierInvocationArguments();
    }
  }

  cleanModifierInvocationArguments(): void {
    for (const attribute of this.attributes.items) {
      if (attribute.kind === NonterminalKind.ModifierInvocation) {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(print: PrintFunction): Doc {
    return printFunction(['function ', print('name')], this, print);
  }
}
