import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ReceiveFunctionAttributes } from './ReceiveFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class ReceiveFunctionDefinition implements SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionDefinition;

  comments;

  loc;

  receiveKeyword: string;

  parameters: ParametersDeclaration;

  attributes: ReceiveFunctionAttributes;

  body: FunctionBody;

  constructor(
    ast: ast.ReceiveFunctionDefinition,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.receiveKeyword = ast.receiveKeyword.text;
    this.parameters = new ParametersDeclaration(
      ast.parameters,
      offsets[0],
      options
    );
    this.attributes = new ReceiveFunctionAttributes(
      ast.attributes,
      offsets[1],
      options
    );
    this.body = new FunctionBody(ast.body, offsets[2], options);

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
    this.attributes.items.forEach((attribute) => {
      if (
        typeof attribute.variant !== 'string' &&
        attribute.variant.kind === 'ModifierInvocation'
      ) {
        attribute.variant.cleanModifierInvocationArguments();
      }
    });
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return printFunction(this.receiveKeyword, this, path, print);
  }
}
