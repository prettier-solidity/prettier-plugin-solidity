import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { UnnamedFunctionAttributes } from './UnnamedFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class UnnamedFunctionDefinition implements SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionDefinition;

  comments;

  loc;

  parameters: ParametersDeclaration;

  attributes: UnnamedFunctionAttributes;

  body: FunctionBody;

  constructor(
    ast: ast.UnnamedFunctionDefinition,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.parameters = new ParametersDeclaration(ast.parameters, options);
    this.attributes = new UnnamedFunctionAttributes(ast.attributes, options);
    this.body = new FunctionBody(ast.body, options);

    metadata = updateMetadata(metadata, [
      this.parameters,
      this.attributes,
      this.body
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.cleanModifierInvocationArguments();
  }

  cleanModifierInvocationArguments(): void {
    for (const { variant: attribute } of this.attributes.items) {
      if (typeof attribute !== 'string') {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(path: AstPath<UnnamedFunctionDefinition>, print: PrintFunction): Doc {
    return printFunction('function', this, path, print);
  }
}
