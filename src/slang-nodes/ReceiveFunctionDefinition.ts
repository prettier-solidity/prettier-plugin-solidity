import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunctionWithBody } from '../slang-printers/print-function.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ReceiveFunctionAttributes } from './ReceiveFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class ReceiveFunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionDefinition;

  parameters: ParametersDeclaration;

  attributes: ReceiveFunctionAttributes;

  body: FunctionBody['variant'];

  constructor(
    ast: ast.ReceiveFunctionDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.parameters = new ParametersDeclaration(
      ast.parameters,
      collected,
      options
    );
    this.attributes = new ReceiveFunctionAttributes(
      ast.attributes,
      collected,
      options
    );
    this.body = extractVariant(new FunctionBody(ast.body, collected, options));

    this.updateMetadata(this.parameters, this.attributes, this.body);

    for (const attribute of this.attributes.items) {
      if (attribute.kind === NonterminalKind.ModifierInvocation) {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(print: PrintFunction): Doc {
    return printFunctionWithBody('receive', this, print);
  }
}
