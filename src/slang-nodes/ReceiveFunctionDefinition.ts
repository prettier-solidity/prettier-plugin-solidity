import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ReceiveFunctionAttributes } from './ReceiveFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ReceiveFunctionDefinition implements SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionDefinition;

  comments;

  loc;

  parameters: ParametersDeclaration;

  attributes: ReceiveFunctionAttributes;

  body: FunctionBody;

  constructor(
    ast: ast.ReceiveFunctionDefinition,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.parameters = new ParametersDeclaration(ast.parameters, options);
    this.attributes = new ReceiveFunctionAttributes(ast.attributes, options);
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
      if (
        typeof attribute !== 'string' &&
        attribute.kind === NonterminalKind.ModifierInvocation
      ) {
        attribute.cleanModifierInvocationArguments();
      }
    }
  }

  print(path: AstPath<ReceiveFunctionDefinition>, print: PrintFunction): Doc {
    return printFunction('receive', this, path, print);
  }
}
