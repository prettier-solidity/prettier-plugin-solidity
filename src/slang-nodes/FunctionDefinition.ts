import { satisfies } from 'semver';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { FunctionName } from './FunctionName.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionAttributes } from './FunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class FunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.FunctionDefinition;

  name: FunctionName;

  parameters: ParametersDeclaration;

  attributes: FunctionAttributes;

  returns?: ReturnsDeclaration;

  body: FunctionBody;

  constructor(ast: ast.FunctionDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new FunctionName(ast.name);
    this.parameters = new ParametersDeclaration(ast.parameters, options);
    this.attributes = new FunctionAttributes(ast.attributes, options);
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, options);
    }
    this.body = new FunctionBody(ast.body, options);

    this.updateMetadata(
      this.name,
      this.parameters,
      this.attributes,
      this.returns,
      this.body
    );

    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    if (satisfies(options.compiler, '>=0.5.0')) {
      this.cleanModifierInvocationArguments();
    }
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

  print(path: AstPath<FunctionDefinition>, print: PrintFunction): Doc {
    return printFunction(
      ['function ', path.call(print, 'name')],
      this,
      path,
      print
    );
  }
}
