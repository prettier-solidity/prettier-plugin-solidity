import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunctionWithBody } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { UnnamedFunctionAttributes } from './UnnamedFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class UnnamedFunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionDefinition;

  parameters: ParametersDeclaration;

  attributes: UnnamedFunctionAttributes;

  body: FunctionBody;

  constructor(
    ast: ast.UnnamedFunctionDefinition,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.parameters = new ParametersDeclaration(ast.parameters, options);
    this.attributes = new UnnamedFunctionAttributes(ast.attributes, options);
    this.body = new FunctionBody(ast.body, options);

    this.updateMetadata(this.parameters, this.attributes, this.body);

    this.cleanModifierInvocationArguments();
  }

  cleanModifierInvocationArguments(): void {
    for (const { variant: attribute } of this.attributes.items) {
      if (attribute.kind === NonterminalKind.ModifierInvocation) {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(path: AstPath<UnnamedFunctionDefinition>, print: PrintFunction): Doc {
    return printFunctionWithBody('function', this, path, print);
  }
}
