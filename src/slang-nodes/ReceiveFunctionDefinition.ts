import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunctionWithBody } from '../slang-printers/print-function.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ReceiveFunctionAttributes } from './ReceiveFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ReceiveFunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionDefinition;

  parameters: ParametersDeclaration;

  attributes: ReceiveFunctionAttributes;

  body: FunctionBody['variant'];

  constructor(
    ast: ast.ReceiveFunctionDefinition,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.parameters = new ParametersDeclaration(ast.parameters, options);
    this.attributes = new ReceiveFunctionAttributes(ast.attributes, options);
    this.body = extractVariant(new FunctionBody(ast.body, options));

    this.updateMetadata(this.parameters, this.attributes, this.body);

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

  print(path: AstPath<ReceiveFunctionDefinition>, print: PrintFunction): Doc {
    return printFunctionWithBody('receive', this, path, print);
  }
}
